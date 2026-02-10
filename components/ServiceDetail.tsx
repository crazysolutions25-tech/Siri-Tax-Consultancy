
import React from 'react';
import { DetailedService, ServiceIcon } from '../constants';

interface ServiceDetailProps {
  service: DetailedService;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative bg-slate-900 pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={service.imageUrl} alt="" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-400 mb-8 hover:text-indigo-300 transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Services
          </button>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                {service.category} Service
              </span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6">{service.title}</h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shrink-0">
              <ServiceIcon id={service.iconId} className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3">
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-slate-900 mb-6">Service Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{service.fullContent}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Documents Required
                </h3>
                <ul className="space-y-4">
                  {service.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-600">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2.5 flex-shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  The Process
                </h3>
                <div className="space-y-6">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-0 top-0 w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold border border-indigo-100">
                        {idx + 1}
                      </div>
                      <p className="text-slate-600 text-sm font-medium pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Key Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-700 bg-white p-4 rounded-2xl shadow-sm">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                  <img src={service.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-serif mb-6">Need This Service?</h4>
                  <p className="text-slate-400 mb-8 text-sm">Book a personal consultation with our CA expert today to discuss your {service.title} requirements.</p>
                  <button onClick={() => {
                    const contactSec = document.getElementById('contact');
                    contactSec?.scrollIntoView({ behavior: 'smooth' });
                    onBack();
                  }} className="block w-full text-center py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all mb-4 active:scale-95">Book Now</button>
                  <div className="text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Or Call Us</span>
                    <p className="text-xl font-bold text-white mt-1">89777 56671</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
