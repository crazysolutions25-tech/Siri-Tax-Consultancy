
import React, { useState } from 'react';
import { SERVICES } from '../constants';
import ServicesGrid from './ServicesGrid';

interface ServicesPageProps {
  onServiceSelect: (id: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Consultancy Catalog</span>
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">Expert Services for Every <br />Financial Lifecycle</h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            From individual tax filing to complex corporate audits, our team provides data-driven strategies to ensure compliance and maximize your fiscal growth.
          </p>

          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search services (e.g. GST, ITR, Company Registration)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl bg-white shadow-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-600 text-slate-700"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>

        <ServicesGrid onServiceSelect={onServiceSelect} filterTerm={searchTerm} />
        
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -z-0"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Can't find what you're looking for?</h2>
              <p className="text-slate-400 text-lg mb-8">
                Our consultancy handles a wide range of custom financial cases. Talk to our senior consultant directly.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Priority Support</span>
                  <p className="text-xl font-bold">+91 89777 56671</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-4 text-indigo-400">Custom Advisory</h3>
              <p className="text-sm text-slate-300 mb-6">We provide specialized advice for NRIs, Startups, and complex GST litigation cases.</p>
              <ul className="space-y-3">
                {['NRI Taxation', 'Startup Pitch Decks', 'GST Appeals', 'Custom Internal Audits'].map(item => (
                  <li key={item} className="flex items-center space-x-3 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
