
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import About from './components/About';
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import Login from './components/Login';
import Profile from './components/Profile';
import ServiceDetail from './components/ServiceDetail';
import DocumentScanner from './components/DocumentScanner';
import GstCalculator from './components/GstCalculator';
import RulesRegulations from './components/RulesRegulations';
import ServicesPage from './components/ServicesPage';
import AdminDashboard from './components/AdminDashboard';
import AboutPage from './components/AboutPage';
import SEOManager from './components/SEOManager';
import WhatsAppButton from './components/WhatsAppButton';
import { DetailedService } from './constants';
import { User } from './types';
import { MockAPI } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<DetailedService | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<DetailedService[]>([]);
  const [isDbLoaded, setIsDbLoaded] = useState(false);

  useEffect(() => {
    const initBackend = async () => {
      await MockAPI.initialize();
      const res = await MockAPI.services.getAll();
      if (res.success) {
        setServices(res.data || []);
      }
      setIsDbLoaded(true);
    };
    initBackend();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedService]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedService(null);
  };

  const handleServiceSelect = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setSelectedService(service);
      setCurrentPage('service-detail');
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const scrollToContact = () => {
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (!isDbLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Connecting to Backend...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('home')} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleProfileUpdate} onBack={() => setCurrentPage('home')} /> : <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('home')} />;
      case 'admin-dashboard':
        return user?.role === 'admin' ? <AdminDashboard /> : <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('home')} />;
      case 'services-list':
        return <ServicesPage onServiceSelect={handleServiceSelect} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'service-detail':
        return selectedService ? (
          <ServiceDetail service={selectedService} onBack={() => setCurrentPage('services-list')} />
        ) : <ServicesPage onServiceSelect={handleServiceSelect} />;
      case 'gst-calculator':
        return <GstCalculator />;
      case 'rules':
        return <RulesRegulations />;
      case 'home':
      default:
        return (
          <>
            <Hero 
              onExplore={() => {
                document.getElementById('services-grid-section')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              onLearnMore={() => {
                handleNavigate('about');
              }} 
            />

            <div id="services-grid-section" className="bg-white py-20 border-b border-slate-100">
              <div className="container mx-auto px-6 text-center mb-12">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Our Expertise</span>
                <h2 className="text-4xl font-serif text-slate-900 mb-4">Core Consultancy Services</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Professional financial solutions tailored for your growth.</p>
              </div>
              <ServicesGrid onServiceSelect={handleServiceSelect} limit={6} />
              <div className="text-center mt-12">
                <button 
                  onClick={() => handleNavigate('services-list')}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
                >
                  View All 9 Services
                </button>
              </div>
            </div>
            
            <div className="bg-indigo-600 py-12">
              <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Returns Filed', val: '5,000+' },
                  { label: 'Corporate Clients', val: '500+' },
                  { label: 'Years Serving', val: '5+' },
                  { label: 'Growth Rating', val: '4.9/5' }
                ].map(stat => (
                  <div key={stat.label} className="text-center text-white">
                    <div className="text-3xl font-bold mb-1">{stat.val}</div>
                    <div className="text-xs uppercase tracking-widest opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <About />
            <DocumentScanner />
            
            <section className="bg-slate-100 py-16">
              <div className="container mx-auto px-6">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                  <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 relative z-10">Simplify Your <br />Tax Journey Today</h2>
                  <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">Our AI-powered tools and expert consultants are ready to help you save time and maximize deductions.</p>
                  <button 
                    onClick={scrollToContact} 
                    className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl inline-block hover:bg-indigo-700 transition-all relative z-10 active:scale-95"
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
            </section>

            <ContactForm user={user || undefined} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOManager currentPage={currentPage} selectedService={selectedService} />
      <Header currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} user={user} />
      <main>
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} onServiceSelect={handleServiceSelect} />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}

export default App;
