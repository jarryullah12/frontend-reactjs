import React, { useState, useEffect } from 'react';
import { VehicleType, PRICING, VEHICLE_CATEGORIES } from '../types';
import { Calculator, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface CalculatorWidgetProps {
  initialVehicle?: VehicleType;
  className?: string;
}

const CalculatorWidget: React.FC<CalculatorWidgetProps> = ({ initialVehicle, className = '' }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleType>(initialVehicle || VehicleType.EXPRESS_SMALL_VAN);
  const [distance, setDistance] = useState<number | ''>('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (typeof distance === 'number' && distance > 0) {
      const { basePrice, pricePerKm } = PRICING[vehicle];
      setTotalPrice(basePrice + (pricePerKm * distance));
    } else {
      setTotalPrice(null);
    }
  }, [vehicle, distance]);

  const handleBookClick = () => {
    const params = new URLSearchParams();
    params.append('vehicle', vehicle);
    if (distance) {
      params.append('distance', distance.toString());
    }
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 ${className}`}>
      <div className="bg-slate-900 p-6 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          {t('calculator.widgetTitle')}
        </h3>
        <p className="text-slate-400 text-sm mt-1">{t('calculator.widgetSubtitle')}</p>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* Vehicle Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('calculator.selectVehicle')}</label>
          <div className="relative">
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value as VehicleType)}
              className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-slate-900 cursor-pointer"
            >
              {Object.entries(VEHICLE_CATEGORIES).map(([category, types]) => (
                <optgroup key={category} label={t(`vehicleCategories.${category}`)} className="text-slate-900 font-bold bg-gray-50">
                  {types.map((type) => (
                    <option key={type} value={type} className="text-slate-700 bg-white font-normal py-1">
                      {t(`vehicleTypes.${type}`)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.distance')} ({t('common.km')})</label>
          <input
            type="number"
            min="1"
            placeholder="e.g., 150"
            value={distance}
            onChange={(e) => setDistance(e.target.value ? parseFloat(e.target.value) : '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400"
          />
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end">
            <span className="text-gray-500 font-medium">{t('calculator.estTotal')}</span>
            <span className="text-3xl font-bold text-slate-900">
              {totalPrice !== null ? `€${totalPrice.toFixed(2)}` : '---'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">{t('calculator.disclaimer')}</p>
        </div>

        <button 
          onClick={handleBookClick}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-transform active:scale-95 shadow-lg shadow-orange-200"
        >
          {t('calculator.bookQuote')}
        </button>
      </div>
    </div>
  );
};

export default CalculatorWidget;