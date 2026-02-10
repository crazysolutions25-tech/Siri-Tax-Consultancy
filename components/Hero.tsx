
import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onLearnMore }) => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" aria-hidden="true"></div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center">
        <header className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6" role="status">
            Trusted Tax Advisors in Vizag & Srikakulam
          </div>
          <h1 id="hero-heading" className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight mb-6">
            Expert Tax Consultancy in <br />
            <span className="text-indigo-600 italic">Visakhapatnam</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Professional GST registration, ITR filing, and financial advisory services tailored for startups and businesses in Andhra Pradesh. Secure your financial future with Siri Tax.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Our Tax Services
            </button>
            <button
              onClick={onLearnMore}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold shadow-lg shadow-slate-100 hover:border-indigo-300 hover:text-indigo-600 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Learn More
            </button>
          </div>
        </header>

        <div className="lg:w-1/2 relative px-2 sm:px-6 w-full">
          <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-indigo-50">
            <img 
              src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800" 
              alt="Siri Tax Consultancy office providing professional tax advice in Visakhapatnam" 
              loading="eager"
              className="w-full h-[300px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
