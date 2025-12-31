import React, { useEffect, useState, useRef } from 'react';
<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Truck, Container, CheckCircle2, DollarSign, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

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
<<<<<<< HEAD
        threshold: 0.1,
=======
        threshold: 0.1, // Trigger when 10% of the element is visible
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
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
<<<<<<< HEAD
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`${className} transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
=======
    <div 
      ref={ref} 
      style={{ transitionDelay: delay }}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    >
      {children}
    </div>
  );
};

<<<<<<< HEAD
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
=======
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

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
<<<<<<< HEAD
    window.scrollTo({ top: 0, behavior: 'smooth' });
=======
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  };

  return (
    <div className="flex flex-col relative">
      {/* Hero Section */}
<<<<<<< HEAD
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
=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          </ScrollReveal>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
<<<<<<< HEAD
        className={`fixed bottom-10 right-10 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl transition-all duration-500 z-50 hover:bg-blue-600 hover:-translate-y-2 border border-white/10 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-7 h-7" />
      </button>
=======
        className={`fixed bottom-8 right-8 bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:bg-orange-700 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    </div>
  );
};

export default Home;