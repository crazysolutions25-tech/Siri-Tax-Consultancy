
import React, { useState, useMemo } from 'react';
import { SERVICES, ServiceIcon } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface ServicesGridProps {
  onServiceSelect: (id: string) => void;
  limit?: number;
  filterTerm?: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  snippet: string;
  url: string;
}

const CATEGORIES = ['All', 'Taxation', 'Business', 'Accounting', 'Wealth'];

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect, limit, filterTerm }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);

  const filteredServices = useMemo(() => {
    let result = SERVICES;
    
    if (activeCategory !== 'All') {
      result = result.filter(service => service.category === activeCategory);
    }
    
    if (filterTerm) {
      const term = filterTerm.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(term) || 
        s.description.toLowerCase().includes(term)
      );
    }

    return limit ? result.slice(0, limit) : result;
  }, [activeCategory, limit, filterTerm]);

  const handleFetchNews = async () => {
    setIsFetchingNews(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Search for the top 3 latest news articles regarding Indian GST, Income Tax, or financial regulations from the last 7 days. Provide a concise summary for each. Return the data as a JSON array where each object has: id (number), title (string), date (string), category (string), snippet (string), url (the most relevant source link).",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER },
                title: { type: Type.STRING },
                date: { type: Type.STRING },
                category: { type: Type.STRING },
                snippet: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["id", "title", "date", "category", "snippet", "url"]
            }
          }
        },
      });

      const newsData = JSON.parse(response.text || "[]");
      setLatestNews(newsData);
      
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        setGroundingSources(response.candidates[0].groundingMetadata.groundingChunks);
      }
    } catch (error) {
      console.error("News Fetch Error:", error);
    } finally {
      setIsFetchingNews(false);
    }
  };

  return (
    <div className="relative">
      {!limit && (
        <nav className="flex flex-wrap justify-center gap-3 mb-12" aria-label="Service categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-current={activeCategory === category ? 'page' : undefined}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <article 
            key={service.id} 
            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col"
            onClick={() => onServiceSelect(service.id)}
          >
            <div className="h-48 overflow-hidden relative bg-indigo-50">
              <img 
                src={service.imageUrl} 
                alt={`${service.title} services by Siri Tax Consultancy in Andhra Pradesh`} 
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=60&w=400';
                  (e.target as HTMLImageElement).onerror = null;
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-6 flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20">
                  <ServiceIcon id={service.iconId} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 bg-indigo-600/50 backdrop-blur-sm px-2 py-1 rounded">
                  {service.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                {service.title}
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed text-sm flex-1">
                {service.description}
              </p>
              <footer className="pt-4 border-t border-slate-50">
                <span className="text-indigo-600 font-bold text-sm inline-flex items-center">
                  Consultation Details
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </footer>
            </div>
          </article>
        ))}
        {filteredServices.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            No tax services found. Try searching for "GST" or "ITR".
          </div>
        )}
      </div>

      <aside className="mt-20 pt-20 border-t border-slate-100">
        <div className="flex flex-col items-center mb-12">
          <button
            onClick={handleFetchNews}
            disabled={isFetchingNews}
            className="group flex items-center space-x-3 px-8 py-4 bg-white border-2 border-indigo-100 text-indigo-600 rounded-2xl font-bold hover:border-indigo-600 hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isFetchingNews ? (
              <svg className="animate-spin h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            <span>{isFetchingNews ? 'Updating Latest Tax News...' : 'Get Live Compliance Updates'}</span>
          </button>
          <p className="mt-4 text-slate-400 text-xs font-medium uppercase tracking-widest">Region-specific Tax News Grounded by Google Search</p>
        </div>

        {latestNews.length > 0 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-3 gap-6">
              {latestNews.map((news) => (
                <div key={news.id} className="bg-white p-6 rounded-3xl border border-indigo-50 hover:border-indigo-200 transition-all group flex flex-col h-full shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-widest">
                      {news.category}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">{news.date}</span>
                  </div>
                  <h4 className="text-slate-900 font-bold mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {news.snippet}
                  </p>
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center text-indigo-600 font-bold text-xs hover:text-indigo-800 transition-colors"
                  >
                    Read Source Article
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              ))}
            </div>

            {groundingSources.length > 0 && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h5 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">Tax Authority References</h5>
                <div className="flex flex-wrap gap-4">
                  {groundingSources.map((chunk, idx) => chunk.web && (
                    <a 
                      key={idx} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 hover:underline flex items-center"
                    >
                      {chunk.web.title || new URL(chunk.web.uri).hostname}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};

export default ServicesGrid;
