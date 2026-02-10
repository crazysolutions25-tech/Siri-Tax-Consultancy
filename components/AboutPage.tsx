
import React from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Empowering Your <br /><span className="text-indigo-400 italic">Financial Future</span></h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Since 2019, Siri Tax Consultancy has been a trusted partner for businesses and individuals across Andhra Pradesh, simplifying the complexities of taxation and compliance.
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-8">Established in 2019</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Siri Tax Consultancy was founded with a clear vision: to bridge the gap between complex government regulations and business owners. Starting our journey in 2019, we've focused on providing transparent, tech-enabled tax solutions.
                </p>
                <p>
                  Today, we serve a diverse range of clients from Visakhapatnam to Srikakulam, ranging from small startups to established corporations. Our multi-location presence allows us to offer personalized local expertise combined with modern efficiency.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="text-4xl font-serif text-indigo-600 mb-2">5+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Years of Growth</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="text-4xl font-serif text-indigo-600 mb-2">500+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Active Clients</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="text-4xl font-serif text-indigo-600 mb-2">2</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Core Locations</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="text-4xl font-serif text-indigo-600 mb-2">100%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Compliance Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-6">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To simplify the taxation landscape for Indian businesses through innovative AI-driven tools and expert human advisory, ensuring that compliance becomes a catalyst for growth rather than a hurdle.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-6">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted and tech-forward financial consultancy in Andhra Pradesh, recognized for our integrity, accuracy, and unwavering commitment to our clients' financial health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Values */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Values</span>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-16">Principles That Guide Us</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Integrity', desc: 'Honest and ethical advice in every transaction.' },
              { title: 'Innovation', desc: 'Embracing AI and modern tools to serve you better.' },
              { title: 'Accuracy', desc: 'Precision in every return and financial report.' }
            ].map(value => (
              <div key={value.title} className="p-8">
                <div className="text-indigo-600 text-xl font-bold mb-4">{value.title}</div>
                <p className="text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Ready to start your financial journey with us?</h2>
          <button 
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }} 
            className="px-10 py-5 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95"
          >
            Consult With Our Experts
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
