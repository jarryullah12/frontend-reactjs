import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  CheckCircle2,
  DollarSign,
  ArrowUp,
  Info,
  ChevronRight,
  ChevronLeft,
  MapPin,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { VehicleType, VehicleCategory, VEHICLE_CATEGORIES, PRICING } from '../types';

import SmallVanImg from "../assets/vehicles/small.jpg";
import MediumVanImg from "../assets/vehicles/medium.jpg";
import LargeVanImg from "../assets/vehicles/large.jpg";
import LiftgateVanImg from "../assets/vehicles/liftgate.jpg";
import ToploaderVanImg from "../assets/vehicles/toploader.jpg";
import HazardousGoods from "../assets/vehicles/HazardousGoods.jpg";
import Van230cm from "../assets/vehicles/230cm.jpg";
import Van240cm from "../assets/vehicles/240cm.jpg";
import van450cm from "../assets/vehicles/450cm.jpg";
import van480cm from "../assets/vehicles/480cm.jpg";
import Truck3t from "../assets/vehicles/3tTruck.jpg";
import Truck5t from "../assets/vehicles/5tTruck.jpg";
import Truck12t from "../assets/vehicles/12tTruck.jpg";
import Trailer24tSemi from "../assets/vehicles/24tSemiTrailer.jpg";

// Carousel images
import Carousel1 from "../assets/carousal/1.jpeg";
import Carousel2 from "../assets/carousal/2.jpeg";
import Carousel3 from "../assets/carousal/3.jpeg";
import Carousel4 from "../assets/carousal/4.jpg";
import Carousel5 from "../assets/carousal/5.jpg";

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
        threshold: 0.1,
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
      className={`${className} transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      {children}
    </div>
  );
};

// HeroVideo component removed as per requirements
const HeroBackground: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Array of images for the carousel
  const heroImages = [
    Carousel1,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5
  ];
  
  // Auto-rotate the images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {heroImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={image} 
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }} // Darken the images to ensure text remains readable
          />
        </div>
      ))}
      
      {/* Position indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fleet Selection State
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>(VehicleCategory.EXPRESS);

  // Pagination State for Fleet Matrix
  const [matrixPage, setMatrixPage] = useState(1);
  const matrixPageSize = 5;
  const allVehicleEntries = Object.entries(VehicleType);
  const totalMatrixPages = Math.ceil(allVehicleEntries.length / matrixPageSize);
  const currentMatrixVehicles = allVehicleEntries.slice((matrixPage - 1) * matrixPageSize, matrixPage * matrixPageSize);

  const heroFeatures = t('home.hero.features') as unknown as { title: string; desc: string }[];

  // Comprehensive Vehicle Data
  const vehicleData: Record<VehicleType, any> = {
    [VehicleType.EXPRESS_SMALL_VAN]: {
      label: t('vehicleDetails.EXPRESS_SMALL_VAN.label'),
      desc: t('vehicleDetails.EXPRESS_SMALL_VAN.desc'),
      image: SmallVanImg
    },
    [VehicleType.EXPRESS_MEDIUM_VAN]: {
      label: t('vehicleDetails.EXPRESS_MEDIUM_VAN.label'),
      desc: t('vehicleDetails.EXPRESS_MEDIUM_VAN.desc'),
      image: MediumVanImg
    },
    [VehicleType.EXPRESS_LARGE_VAN]: {
      label: t('vehicleDetails.EXPRESS_LARGE_VAN.label'),
      desc: t('vehicleDetails.EXPRESS_LARGE_VAN.desc'),
      image: LargeVanImg
    },
    [VehicleType.EXPRESS_LIFT]: {
      label: t('vehicleDetails.EXPRESS_LIFT.label'),
      desc: t('vehicleDetails.EXPRESS_LIFT.desc'),
      image: LiftgateVanImg
    },
    [VehicleType.EXTRA_LEN_450]: {
      label: t('vehicleDetails.EXTRA_LEN_450.label'),
      desc: t('vehicleDetails.EXTRA_LEN_450.desc'),
      image: van450cm
    },
    [VehicleType.EXTRA_LEN_480]: {
      label: t('vehicleDetails.EXTRA_LEN_480.label'),
      desc: t('vehicleDetails.EXTRA_LEN_480.desc'),
      image: van480cm
    },
    [VehicleType.EXTRA_WID_230]: {
      label: t('vehicleDetails.EXTRA_WID_230.label'),
      desc: t('vehicleDetails.EXTRA_WID_230.desc'),
      image: Van230cm
    },
    [VehicleType.EXTRA_HEI_240]: {
      label: t('vehicleDetails.EXTRA_HEI_240.label'),
      desc: t('vehicleDetails.EXTRA_HEI_240.desc'),
      image: Van240cm
    },
    [VehicleType.EXTRA_TOP_LOAD]: {
      label: t('vehicleDetails.EXTRA_TOP_LOAD.label'),
      desc: t('vehicleDetails.EXTRA_TOP_LOAD.desc'),
      image: ToploaderVanImg
    },
    [VehicleType.EXTRA_HAZARDOUS]: {
      label: t('vehicleDetails.EXTRA_HAZARDOUS.label'),
      desc: t('vehicleDetails.EXTRA_HAZARDOUS.desc'),
      image: HazardousGoods
    },
    [VehicleType.TRUCK_3T]: {
      label: t('vehicleDetails.TRUCK_3T.label'),
      desc: t('vehicleDetails.TRUCK_3T.desc'),
      image: Truck3t
    },
    [VehicleType.TRUCK_5T]: {
      label: t('vehicleDetails.TRUCK_5T.label'),
      desc: t('vehicleDetails.TRUCK_5T.desc'),
      image: Truck5t
    },
    [VehicleType.TRUCK_12T]: {
      label: t('vehicleDetails.TRUCK_12T.label'),
      desc: t('vehicleDetails.TRUCK_12T.desc'),
      image: Truck12t
    },
    [VehicleType.TRUCK_24T]: {
      label: t('vehicleDetails.TRUCK_24T.label'),
      desc: t('vehicleDetails.TRUCK_24T.desc'),
      image: Trailer24tSemi
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col relative">
      {/* Hero Section */}
      <section className="relative bg-slate-900 h-[85vh] min-h-[680px] flex items-end justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-12">
          <div className="w-fit p-8 md:p-9 bg-black/30 backdrop-blur-sm rounded-3xl shadow-2xl animate-fadeInLeft">
            <h1 className="text-2xl md:text-3xl font-black leading-tight mb-6 text-white tracking-tight">
              {t('home.hero.title')} <span className="text-blue-400">{t('home.hero.titleSuffix')}</span>
            </h1>
            <div className="space-y-4 mb-8">
              {Array.isArray(heroFeatures) && heroFeatures.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                  <div className="mt-0.5 bg-blue-500 rounded-md p-1 h-fit shadow-md shadow-blue-500/10 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black text-white leading-tight mb-0.5">{item.title}</h3>
                    <p className="text-gray-200 text-[11px] md:text-xs font-medium leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/calculator"
              className="inline-flex bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-200 transition-all hover:scale-105 items-center gap-2 shadow-xl active:scale-95 group"
            >
              {t('home.fleet.calculateAndBook')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Grid-Based Fleet Showcase Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t('home.fleet.title')}</h2>
                <p className="text-gray-500 font-medium">{t('home.fleet.subtitle')}</p>
              </div>

              <div className="flex bg-slate-100/80 p-1 rounded-full w-fit">
                {Object.keys(VEHICLE_CATEGORIES).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as VehicleCategory)}
                    className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${activeCategory === cat
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                      }`}
                  >
                    {t(`vehicleCategories.${cat}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn" key={activeCategory}>
              {VEHICLE_CATEGORIES[activeCategory].map((vType) => {
                const vehicle = vehicleData[vType];
                const price = PRICING[vType];

                return (
                  <div key={vType} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img
                        src={vehicle.image}
                        alt={vehicle.label}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                          {activeCategory}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-black text-slate-900 mb-2">{vehicle.label}</h3>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                        {vehicle.desc}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-2xl font-black text-slate-900">€{price.basePrice}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{t('home.fleet.baseFee')}</span>
                        </div>
                        <button
                          onClick={() => navigate(`/booking?vehicle=${vType}`)}
                          className="w-full bg-slate-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                        >
                          {t('common.bookNow')} <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight">{t('home.fleet.matrixTitle')}</h2>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em]">{t('home.fleet.vehicleType')}</th>
                      <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em]">{t('home.fleet.category')}</th>
                      <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em]">{t('home.fleet.baseFee')}</th>
                      <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em]">{t('home.fleet.rateKm')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentMatrixVehicles.map(([key, value]) => {
                      const price = PRICING[value];
                      const category = Object.entries(VEHICLE_CATEGORIES).find(([_, list]) => list.includes(value))?.[0];
                      return (
                        <tr key={key} className="hover:bg-blue-50/30 transition-all duration-300 group">
                          <td className="px-8 py-6 text-slate-900 font-black text-base">{t(`vehicleTypes.${value}`)}</td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full text-gray-500">{category}</span>
                          </td>
                          <td className="px-8 py-6 text-slate-900 font-bold">€{price.basePrice.toFixed(2)}</td>
                          <td className="px-8 py-6 text-blue-600 font-black">€{price.pricePerKm.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  {t('home.fleet.showing')
                    .replace('{{start}}', ((matrixPage - 1) * matrixPageSize + 1).toString())
                    .replace('{{end}}', Math.min(matrixPage * matrixPageSize, allVehicleEntries.length).toString())
                    .replace('{{total}}', allVehicleEntries.length.toString())}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMatrixPage(prev => Math.max(1, prev - 1))}
                    disabled={matrixPage === 1}
                    className="p-2 rounded-full border border-gray-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalMatrixPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setMatrixPage(pageNum)}
                        className={`w-8 h-8 rounded-full text-[10px] font-black transition-all ${matrixPage === pageNum
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-white text-slate-400 hover:text-slate-600 hover:bg-gray-100'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setMatrixPage(prev => Math.min(totalMatrixPages, prev + 1))}
                    disabled={matrixPage === totalMatrixPages}
                    className="p-2 rounded-full border border-gray-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section - Positioned Above Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <ScrollReveal delay="0ms">
              <div className="p-6">
                <div className="text-5xl md:text-7xl font-black text-blue-500 mb-4 drop-shadow-lg">10k+</div>
                <div className="text-gray-400 font-black tracking-[0.2em] uppercase text-xs">{t('about.stats.clients')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay="100ms">
              <div className="p-6">
                <div className="text-5xl md:text-7xl font-black text-blue-400 mb-4 drop-shadow-lg">5M+</div>
                <div className="text-gray-400 font-black tracking-[0.2em] uppercase text-xs">{t('about.stats.km')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay="200ms">
              <div className="p-6">
                <div className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">150+</div>
                <div className="text-gray-400 font-black tracking-[0.2em] uppercase text-xs">{t('about.stats.vehicles')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay="300ms">
              <div className="p-6">
                <div className="text-5xl md:text-7xl font-black text-green-500 mb-4 drop-shadow-lg">99%</div>
                <div className="text-gray-400 font-black tracking-[0.2em] uppercase text-xs">{t('about.stats.ontime')}</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Positioned Above CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{t('home.why.title')}</h2>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3">{t('home.why.tracking')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{t('home.why.trackingDesc')}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3">{t('home.why.pricing')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{t('home.why.pricingDesc')}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3">{t('home.why.drivers')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{t('home.why.driversDesc')}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3">{t('home.why.insurance')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{t('home.why.insuranceDesc')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Ready to move your cargo? */}
      <section className="py-24 bg-gray-100 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-blue-200">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-2xl active:scale-95 group"
            >
              {t('booking.title')} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl transition-all duration-500 z-50 hover:bg-blue-600 hover:-translate-y-2 border border-white/10 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-7 h-7" />
      </button>
    </div>
  );
};

export default Home;