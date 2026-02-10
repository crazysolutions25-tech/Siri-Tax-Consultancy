
import React, { useState } from 'react';
import { analyzeDocument } from '../services/geminiService';

const DocumentScanner: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setResult(null);

    const base64Reader = new FileReader();
    base64Reader.onload = async () => {
      const base64 = (base64Reader.result as string).split(',')[1];
      const analysis = await analyzeDocument(base64, file.type);
      setResult(analysis);
      setIsAnalyzing(false);
    };
    base64Reader.readAsDataURL(file);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative shadow-3xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -z-10"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4 block">New: AI Vision</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Instant AI Document Insights</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Upload your Form 16, GST Invoices, or business receipts. Our AI vision engine automatically extracts data and flags anomalies in seconds.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Automatic Data Extraction', 'Compliance Anomaly Detection', 'Instant Digitization'].map(item => (
                  <li key={item} className="flex items-center space-x-3 text-slate-300">
                    <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-white/5 border-2 border-dashed border-slate-700 group-hover:border-indigo-500 transition-all rounded-3xl p-10 text-center">
                  <svg className="w-12 h-12 text-slate-500 group-hover:text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <p className="font-bold text-slate-300">Click to Upload or Drag & Drop</p>
                  <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-3xl p-6 min-h-[450px] border border-slate-700 flex flex-col">
              {isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-indigo-400 font-bold animate-pulse">Gemini is analyzing your document...</p>
                </div>
              ) : result ? (
                <div className="flex-1 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-xs">Analysis Report</h4>
                    <button onClick={() => setResult(null)} className="text-xs text-slate-500 hover:text-white">Clear</button>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none bg-slate-900/50 p-6 rounded-2xl border border-slate-700 overflow-y-auto max-h-[350px]">
                    <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                      {result}
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                    <p className="text-xs text-indigo-200">Disclaimer: This is an AI extract. Please verify figures before filing.</p>
                  </div>
                </div>
              ) : preview ? (
                <div className="flex-1 flex items-center justify-center">
                   <img src={preview} alt="Preview" className="max-h-[400px] rounded-xl object-contain shadow-2xl" />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                  <svg className="w-20 h-20 mb-4 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                  <p className="text-sm font-medium">Document analysis will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentScanner;
