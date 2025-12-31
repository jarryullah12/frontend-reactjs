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