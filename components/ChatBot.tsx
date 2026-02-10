
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { getChatResponse, analyzeDocument } from '../services/geminiService';
import { ChatMessage } from '../types';

const CHAT_STORAGE_KEY = 'siri_chat_history';

// Audio Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
    return [
      { role: 'model', text: "Welcome to Siri AI. I can chat, analyze documents, or speak with you in real-time. How can I help?", timestamp: new Date() }
    ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const voiceSessionRef = useRef<{ 
    session: any, 
    inputCtx: AudioContext, 
    stream: MediaStream 
  } | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => { 
    if (isOpen) scrollToBottom(); 
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await getChatResponse(input, history, isDeepThinking);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isLoading) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      text: `[Attached Document: ${file.name}]`, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        const analysis = await analyzeDocument(base64, file.type);
        setMessages(prev => [...prev, { role: 'model', text: analysis, timestamp: new Date() }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: "Failed to analyze the document. Please ensure it's a clear image or PDF.", timestamp: new Date() }]);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startVoiceMode = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const outputCtx = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsVoiceActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const data = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(data.length);
              for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ 
                media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
              }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
            
            sessionPromise.then(session => {
              voiceSessionRef.current = { session, inputCtx, stream };
            });
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const ctx = audioContextRef.current;
              if (!ctx) return;
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              
              source.onended = () => {
                sourceNodesRef.current.delete(source);
              };
              sourceNodesRef.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              sourceNodesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourceNodesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are a friendly Siri Tax AI assistant. Provide concise, helpful tax advice over voice.",
        }
      });
    } catch (err) {
      console.error("Voice Error:", err);
      setIsVoiceActive(false);
    }
  };

  const stopVoiceMode = () => {
    if (voiceSessionRef.current) {
      voiceSessionRef.current.stream.getTracks().forEach((t) => t.stop());
      voiceSessionRef.current.inputCtx.close();
      try {
        voiceSessionRef.current.session.close();
      } catch (e) {}
      voiceSessionRef.current = null;
    }
    sourceNodesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourceNodesRef.current.clear();
    setIsVoiceActive(false);
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      const defaultMessages: ChatMessage[] = [
        { role: 'model', text: "Chat history cleared. How can I help you today?", timestamp: new Date() }
      ];
      setMessages(defaultMessages);
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[450px] h-[75vh] sm:h-[600px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-indigo-600 p-4 sm:p-5 text-white flex justify-between items-center shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl">
                {isVoiceActive ? '🎙️' : '🧠'}
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">Siri AI Expert</h4>
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isVoiceActive ? 'bg-red-400' : 'bg-green-400'}`}></span>
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold opacity-80">
                    {isVoiceActive ? 'Live Voice' : isDeepThinking ? 'Deep Thinking Engaged' : 'Expert Reasoner'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={clearHistory} className="p-2 hover:bg-white/10 rounded-xl transition-colors" title="Clear History">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              <button onClick={() => { stopVoiceMode(); setIsOpen(false); }} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 relative">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-xs sm:text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-3xl rounded-tl-none shadow-sm flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  {isDeepThinking && (
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest animate-pulse">Running Deep Reasoning...</span>
                  )}
                </div>
              </div>
            )}
            
            {isVoiceActive && (
              <div className="absolute inset-0 bg-indigo-900/10 backdrop-blur-sm flex items-center justify-center z-10 p-4">
                <div className="text-center bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-indigo-100 animate-in zoom-in-95 w-full max-w-xs">
                  <div className="flex items-center justify-center space-x-2 mb-4 h-12">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 bg-indigo-600 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                  <p className="font-bold text-slate-800 text-sm sm:text-base">Listening to you...</p>
                  <button onClick={stopVoiceMode} className="mt-4 px-6 py-3 bg-red-50 text-red-600 rounded-full font-bold text-xs hover:bg-red-100 transition-colors w-full">Stop Voice</button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 sm:p-4 bg-white border-t border-slate-100 space-y-3 shrink-0">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button 
                  onClick={() => setIsDeepThinking(!isDeepThinking)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-full text-[9px] sm:text-[10px] font-bold transition-all shadow-sm group ${isDeepThinking ? 'bg-indigo-600 text-white ring-2 ring-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
                  title="Deep Thinking: Uses more tokens and lower temperature for highly precise, reasoned responses."
                >
                  <svg className={`w-3 h-3 ${isDeepThinking ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM16.243 16.243a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" /></svg>
                  <span>Deep Reasoning</span>
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Upload Document"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*,application/pdf"
                />
              </div>
              <button 
                onClick={isVoiceActive ? stopVoiceMode : startVoiceMode} 
                className={`p-2.5 rounded-xl transition-colors ${isVoiceActive ? 'bg-red-50 text-red-600' : 'text-indigo-600 hover:bg-indigo-50'}`} 
                title={isVoiceActive ? "Stop Voice" : "Voice Assistant"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                ref={inputRef} 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
                placeholder={isDeepThinking ? "Consult on complex tax planning..." : "Ask a tax question..."} 
                className={`flex-1 px-4 py-3.5 border rounded-2xl text-xs sm:text-sm outline-none transition-all ${isDeepThinking ? 'bg-indigo-50/30 border-indigo-200 focus:ring-2 focus:ring-indigo-400' : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-indigo-500'}`} 
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading} 
                className="p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-indigo-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-800 rotate-90 shadow-slate-200' : 'bg-indigo-600 shadow-indigo-100'}`}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? (
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
