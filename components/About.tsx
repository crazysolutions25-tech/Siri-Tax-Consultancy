
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-50 rounded-full -z-10" aria-hidden="true"></div>
              <div className="rounded-3xl shadow-2xl border border-slate-100 overflow-hidden bg-indigo-50">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  alt="Siri Tax team collaboration" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Main Desktop Infographic Badge */}
              <div className="absolute -bottom-10 -right-10 bg-indigo-600 text-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block animate-in fade-in slide-in-from-right-10 duration-1000" aria-hidden="true">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/20" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset="26" className="text-white animate-draw" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">99%</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1">5+</div>
                    <div className="text-xs font-bold uppercase tracking-wider opacity-80 leading-tight">Years of <br />Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">About Siri Tax</span>
            <h2 id="about-heading" className="text-3xl md:text-5xl font-serif text-slate-900 mb-8">Committed to Your Financial Growth</h2>
            
            <div className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                Founded in 2019, Siri Tax Consultancy has grown rapidly from a specialized tax boutique into a leading financial firm serving clients across Srikakulam and Visakhapatnam.
              </p>
              
              {/* Compact Mobile/Tablet Infographic */}
              <div className="flex gap-4 md:hidden py-4">
                <div className="flex-1 bg-indigo-50 p-4 rounded-2xl flex items-center space-x-3">
                  <div className="text-2xl font-bold text-indigo-600">5+</div>
                  <div className="text-[10px] uppercase font-bold text-indigo-900 leading-tight">Years <br/>Experience</div>
                </div>
                <div className="flex-1 bg-indigo-50 p-4 rounded-2xl flex items-center space-x-3">
                  <div className="text-2xl font-bold text-indigo-600">99%</div>
                  <div className="text-[10px] uppercase font-bold text-indigo-900 leading-tight">Client <br/>Trust</div>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">
                Our philosophy is simple: we believe that tax and compliance shouldn't be a burden. We leverage the latest technology and deep regulatory insights to provide proactive solutions that save you time and money.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Expert Team</h3>
                  <p className="text-sm text-slate-500">Chartered Accountants & MBAs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Customized Approach</h3>
                  <p className="text-sm text-slate-500">Tailored strategies for every client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawProgress {
          from { stroke-dashoffset: 175.9; }
          to { stroke-dashoffset: 26; }
        }
        .animate-draw {
          animation: drawProgress 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
