<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { VehicleType, VehicleCategory, VEHICLE_CATEGORIES, PRICING, getVehicleEnumKey } from '../types';
import { Check, Box, Layers, Maximize, ArrowDownCircle, Truck, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';


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


const Services: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>(VehicleCategory.EXPRESS);

  useEffect(() => {
    document.title = `Services | Spedition Askari - Professional Logistics`;
  }, []);

  // Detailed data mapping for icons and images
  const vehicleAssets: Record<VehicleType, { icon: any, image: string }> = {
    [VehicleType.EXPRESS_SMALL_VAN]: { icon: Box, image: SmallVanImg },
    [VehicleType.EXPRESS_MEDIUM_VAN]: { icon: Layers, image: MediumVanImg },
    [VehicleType.EXPRESS_LARGE_VAN]: { icon: Maximize, image: LargeVanImg },
    [VehicleType.EXPRESS_LIFT]: { icon: ArrowDownCircle, image: LiftgateVanImg },
    [VehicleType.EXTRA_LEN_450]: { icon: Truck, image: van450cm },
    [VehicleType.EXTRA_LEN_480]: { icon: Truck, image: van480cm },
    [VehicleType.EXTRA_WID_230]: { icon: Maximize, image: Van230cm },
    [VehicleType.EXTRA_HEI_240]: { icon: Layers, image: Van240cm },
    [VehicleType.EXTRA_TOP_LOAD]: { icon: ArrowDownCircle, image: ToploaderVanImg },
    [VehicleType.EXTRA_HAZARDOUS]: { icon: Truck, image: HazardousGoods },
    [VehicleType.TRUCK_3T]: { icon: Truck, image: Truck3t },
    [VehicleType.TRUCK_5T]: { icon: Truck, image: Truck5t },
    [VehicleType.TRUCK_12T]: { icon: Truck, image: Truck12t },
    [VehicleType.TRUCK_24T]: { icon: Truck, image: Trailer24tSemi }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Static Header - Updated to Blue */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('services.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Categorized Fleet Browser */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center bg-white p-2 rounded-2xl shadow-sm mb-16 border border-gray-100 w-fit mx-auto">
          {Object.keys(VEHICLE_CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as VehicleCategory)}
              className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-gray-400 hover:text-slate-600'
                }`}
            >
              {t(`vehicleCategories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
          {VEHICLE_CATEGORIES[activeCategory].map((vType) => {
            const assets = vehicleAssets[vType];
            const price = PRICING[vType];
            const Icon = assets.icon;

            // Get translations for this vehicle type
            const vKey = getVehicleEnumKey(vType);
            const title = t(`vehicleDetails.${vKey}.label`);
            const desc = t(`vehicleDetails.${vKey}.desc`);
            const capacity = t(`vehicleDetails.${vKey}.capacity`);
            const features = t(`vehicleDetails.${vKey}.features`, { returnObjects: true }) as string[];

            return (
              <div
                key={vType}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group overflow-hidden flex flex-col"
              >
                {/* Visual Header / Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={assets.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="bg-white/90 backdrop-blur p-2.5 rounded-xl text-slate-900 shadow-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-xl font-black tracking-tight">{title}</h3>
                      <p className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                        {t('services.serviceLabel', { category: activeCategory })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-6">
                    <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-[70%]">
                      {desc}
                    </p>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('services.basePrice')}</p>
                      <p className="text-2xl font-black text-slate-900">€{price.basePrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{t('home.fleet.rateKm')}</span>
                      <span className="text-sm font-black text-slate-800">€{price.pricePerKm.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{t('services.capacity')}</span>
                      <span className="text-sm font-black text-slate-800">{capacity}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {Array.isArray(features) && features.map((feature: string, idx: number) => (
                      <span key={idx} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/50">
                        <Check className="w-3 h-3" /> {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/booking?vehicle=${vType}`)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    {t('services.priceAndBooking')} <ChevronRight className="w-4 h-4" />
                  </button>
=======
import React from 'react';
import { VehicleType, PRICING, VehicleCategory, VEHICLE_CATEGORIES } from '../types';
import { Truck, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const servicesList = [
    {
      category: VehicleCategory.EXPRESS,
      representativeType: VehicleType.EXPRESS_SMALL_VAN,
      title: t('services.express.title'),
      desc: t('services.express.desc'),
      capacity: "Up to 1,000 kg / 2 Pallets",
      features: ["Same-day delivery", "GPS Tracking", "Instant POD", "Nationwide coverage"],
      color: "orange",
      image: "https://www.synergycarleasing.co.uk/guides/wp-content/uploads/2024/12/Best-Small-Vans-in-2025.png"
    },
    {
      category: VehicleCategory.EXTRA_EXPRESS,
      representativeType: VehicleType.EXTRA_LEN_450,
      title: t('services.extra.title'),
      desc: t('services.extra.desc'),
      capacity: "Up to 1,500 kg / 4 Pallets",
      features: ["Extra Height or Width", "Crane accessible (Open top)", "Hazardous Goods certified", "Special dimensions"],
      color: "blue",
      image: "https://parkers-images.bauersecure.com/wp-images/18351/930x620/vw-caddy-small-van-payload.jpg"
    },
    {
      category: VehicleCategory.TRUCK,
      representativeType: VehicleType.TRUCK_3T,
      title: t('services.lkw.title'),
      desc: t('services.lkw.desc'),
      capacity: "3T to 24T / Up to 33 Pallets",
      features: ["Full Truck Load (FTL)", "Less than Truck Load (LTL)", "Heavy machinery support", "Europe-wide network"],
      color: "slate",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" // Big Truck
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {servicesList.map((service, index) => {
            const categoryVehicles = VEHICLE_CATEGORIES[service.category];
            
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Image Section - Fixed size 370x295 on desktop */}
                <div className="w-full md:w-[370px] h-64 md:h-[295px] relative bg-slate-200 flex-shrink-0">
                  <img 
                    src={service.image}
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-white text-sm font-bold bg-${service.color === 'slate' ? 'slate-900' : service.color + '-600'}`}>
                    Most Popular
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                      <Truck className={`w-8 h-8 text-${service.color === 'slate' ? 'slate-900' : service.color + '-600'}`} />
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">{service.desc}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                        {/* Features & Capacity */}
                        <div>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                                <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-2 text-sm">
                                    <Info className="w-4 h-4 text-blue-500" />
                                    {t('services.specs')}
                                </h4>
                                <p className="text-slate-700 text-sm"><strong>{t('services.capacity')}:</strong> {service.capacity}</p>
                            </div>

                            <ul className="space-y-3">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing Table */}
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4 text-sm border-b border-slate-200 pb-2">Pricing Breakdown</h4>
                            <div className="space-y-3">
                                {categoryVehicles.map((type) => {
                                    const price = PRICING[type];
                                    const displayName = t(`vehicleTypes.${type}`).replace(/\s*\(.*?\)\s*/g, '');
                                    
                                    return (
                                        <div key={type} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-700 font-medium">{displayName}</span>
                                            <div className="text-right">
                                                <span className="font-bold text-slate-900">€{price.basePrice}</span>
                                                <span className="text-xs text-gray-500 ml-1">+ €{price.pricePerKm}/km</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-end pt-6 border-t border-gray-100 gap-4">
                    <Link 
                      to={`/booking?vehicle=${service.representativeType}`}
                      className={`px-8 py-3 rounded-lg font-bold text-white transition-colors bg-${service.color === 'slate' ? 'slate-900' : service.color + '-600'} hover:opacity-90 w-full sm:w-auto text-center`}
                    >
                      {t('common.bookNow')}
                    </Link>
                  </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;