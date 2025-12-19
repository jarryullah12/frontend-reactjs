import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Truck, Container, CheckCircle2, DollarSign, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Helper component for Scroll Animations
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = "", delay = "0ms" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: delay }}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle Scroll to Top Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col relative">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920" 
            alt="Logistics Highway Background" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-[blob_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
          <div className="flex flex-col items-center">
            <div className="inline-block bg-orange-600 text-xs font-bold px-3 py-1 rounded-full w-fit mb-6 animate-fadeIn">
              {t('home.hero.tag')}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fadeInLeft">
              {t('home.hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{t('home.hero.titleSuffix')}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fadeInLeft [animation-delay:200ms] opacity-0 fill-mode-forwards">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fadeIn [animation-delay:400ms] opacity-0 fill-mode-forwards">
              <Link 
                to="/services" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all hover:scale-105 hover:shadow-orange-500/25 hover:shadow-lg flex items-center gap-2"
              >
                {t('nav.services')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-slate-900 transition-all hover:scale-105"
              >
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('home.services.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('home.services.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <ScrollReveal delay="0ms">
              <div className="group bg-white p-8 rounded-2xl shadow-lg border-b-4 border-orange-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{t('services.express.title')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {t('services.express.desc')}
                </p>
                <Link to="/services" className="text-slate-900 font-bold hover:text-orange-600 inline-flex items-center group/link mt-auto">
                  {t('common.learnMore')} <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Service 2 */}
            <ScrollReveal delay="200ms">
              <div className="group bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{t('services.extra.title')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {t('services.extra.desc')}
                </p>
                <Link to="/services" className="text-slate-900 font-bold hover:text-blue-600 inline-flex items-center group/link mt-auto">
                  {t('common.learnMore')} <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Service 3 */}
            <ScrollReveal delay="400ms">
              <div className="group bg-white p-8 rounded-2xl shadow-lg border-b-4 border-slate-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Container className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-slate-700 transition-colors">{t('services.lkw.title')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {t('services.lkw.desc')}
                </p>
                <Link to="/services" className="text-slate-900 font-bold hover:text-slate-600 inline-flex items-center group/link mt-auto">
                  {t('common.learnMore')} <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('about.storyTitle')}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed text-xl">
                      {t('about.storyP1')}
                  </p>
                  <Link to="/about" className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center gap-2 border-b-2 border-orange-100 hover:border-orange-600 transition-colors pb-1">
                      {t('common.learnMore')} <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
            </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
              <ScrollReveal delay="0ms">
                <div className="hover:transform hover:scale-110 transition-transform duration-300 p-4">
                  <div className="text-4xl md:text-6xl font-bold text-orange-500 mb-2">10k+</div>
                  <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">{t('about.stats.clients')}</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay="100ms">
                <div className="hover:transform hover:scale-110 transition-transform duration-300 p-4">
                  <div className="text-4xl md:text-6xl font-bold text-blue-500 mb-2">5M+</div>
                  <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">{t('about.stats.km')}</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay="200ms">
                <div className="hover:transform hover:scale-110 transition-transform duration-300 p-4">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">150+</div>
                  <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">{t('about.stats.vehicles')}</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay="300ms">
                <div className="hover:transform hover:scale-110 transition-transform duration-300 p-4">
                  <div className="text-4xl md:text-6xl font-bold text-green-500 mb-2">99%</div>
                  <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">{t('about.stats.ontime')}</div>
                </div>
              </ScrollReveal>
           </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.fleetTitle')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We operate a diverse fleet to meet every logistical challenge, from urban deliveries to international freight.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay="0ms">
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-orange-50 border border-gray-100 hover:border-orange-200">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('about.fleetVans')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.fleetVansDesc')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay="200ms">
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-blue-50 border border-gray-100 hover:border-blue-200">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('about.fleetBox')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.fleetBoxDesc')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay="400ms">
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-slate-50 border border-gray-100 hover:border-slate-200">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-10 h-10 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('about.fleetSemi')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.fleetSemiDesc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="relative group">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                alt="Logistics Warehouse Loading" 
                className="relative rounded-2xl shadow-2xl z-10 transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </ScrollReveal>
            
            <ScrollReveal delay="200ms">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">{t('home.why.title')}</h2>
              <div className="space-y-8">
                {[
                  { title: t('home.why.tracking'), desc: t('home.why.trackingDesc') },
                  { title: t('home.why.pricing'), desc: t('home.why.pricingDesc') },
                  { title: t('home.why.drivers'), desc: t('home.why.driversDesc') },
                  { title: t('home.why.insurance'), desc: t('home.why.insuranceDesc') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-slate-800">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">{t('home.cta.title')}</h2>
            <p className="text-slate-300 mb-10 text-xl max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/booking" 
                className="bg-orange-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all hover:scale-105 shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" /> {t('common.bookNow')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:bg-orange-700 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

    </div>
  );
};

export default Home;