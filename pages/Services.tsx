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