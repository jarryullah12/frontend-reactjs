import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { VehicleType, PRICING, VEHICLE_CATEGORIES } from '../types';
import { Send, MapPin, Truck, Calendar, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch } from '../store/hooks';
import { addOrder } from '../store/slices/adminSlice';
import { supabase } from '../services/supabase';

const Booking: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedVehicle = searchParams.get('vehicle') as VehicleType | null;
  const preSelectedDistance = searchParams.get('distance');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
    distance: preSelectedDistance || '',
    vehicle: preSelectedVehicle || VehicleType.EXPRESS_SMALL_VAN,
    date: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,}$/;

    if (!formData.name.trim()) newErrors.name = t('common.name') + ' is required';
    
    if (!formData.email.trim()) {
      newErrors.email = t('common.email') + ' is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('common.phone') + ' is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.date) newErrors.date = t('common.date') + ' is required';
    if (!formData.pickup.trim()) newErrors.pickup = t('common.pickup') + ' is required';
    if (!formData.dropoff.trim()) newErrors.dropoff = t('common.dropoff') + ' is required';
    
    if (!formData.distance) {
      newErrors.distance = t('common.distance') + ' is required';
    } else if (Number(formData.distance) <= 0) {
      newErrors.distance = 'Distance must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const estimatedCost = formData.distance ? 
    (PRICING[formData.vehicle as VehicleType].basePrice + (PRICING[formData.vehicle as VehicleType].pricePerKm * parseFloat(formData.distance.toString()))).toFixed(2) 
    : '0.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const newOrderObj = {
      client: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date || new Date().toLocaleDateString(),
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      distance: formData.distance.toString(),
      route: `${formData.pickup.split(',')[0]} -> ${formData.dropoff.split(',')[0]}`,
      amount: `€${estimatedCost}`,
      status: 'Pending Review',
      vehicle: t(`vehicleTypes.${formData.vehicle}`)
    };

    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([newOrderObj])
            .select();
        
        if (error) throw error;
        
        const orderId = data && data[0] ? data[0].id : `ORD-${Math.floor(Math.random() * 10000)}`;
        
        dispatch(addOrder({
            ...newOrderObj,
            id: orderId
        }));
        
        setSubmitted(true);
    } catch (err: any) {
        console.error("Booking error:", err);
        setSubmitted(true);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-lg w-full border border-gray-100">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('booking.receivedTitle')}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('booking.receivedDesc')}
          </p>
          <div className="flex flex-col gap-4">
            <button 
                onClick={() => navigate('/orders')}
                className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
                View My Bookings
            </button>
            <button 
                onClick={() => setSubmitted(false)}
                className="w-full text-orange-600 font-bold hover:underline py-2"
            >
                {t('booking.submitAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">{t('booking.title')}</h1>
          <p className="text-gray-600 mt-2">{t('booking.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-6 text-white text-center">
            <p className="text-sm opacity-80 uppercase tracking-widest font-semibold">{t('booking.formTitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">{t('booking.contactDetails')}</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.email')}</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+49 123 45678"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.date')}</label>
               <div className="relative">
                 <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                 />
                 <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
               </div>
               {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">{t('booking.transportDetails')}</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.pickup')}</label>
              <div className="relative">
                <input
                  type="text"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.pickup ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City, Address"
                />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.pickup && <p className="text-red-500 text-xs mt-1">{errors.pickup}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.dropoff')}</label>
              <div className="relative">
                <input
                  type="text"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.dropoff ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City, Address"
                />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.dropoff && <p className="text-red-500 text-xs mt-1">{errors.dropoff}</p>}
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.distance')} ({t('common.km')})</label>
              <input
                type="number"
                min="1"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 placeholder-gray-400 ${errors.distance ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. 150"
              />
              {errors.distance && <p className="text-red-500 text-xs mt-1">{errors.distance}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.vehicle')}</label>
              <div className="relative">
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none bg-white text-sm text-slate-900"
                >
                  {Object.entries(VEHICLE_CATEGORIES).map(([category, types]) => (
                    <optgroup key={category} label={t(`vehicleCategories.${category}`)}>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {t(`vehicleTypes.${type}`)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <Truck className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
               <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">{t('booking.paymentMethod')}</h3>
               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-3">
                  <div className="bg-orange-600 p-2 rounded-lg mt-0.5">
                     <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                     <p className="font-bold text-slate-900">{t('booking.pay7Days')}</p>
                     <p className="text-xs text-slate-600 mt-1">Approval is required for this payment term. You will receive an invoice after approval.</p>
                  </div>
               </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-200">
               <div>
                  <span className="text-gray-500 text-sm">{t('booking.estTotal')}</span>
                  <p className="text-xs text-gray-400">{t('booking.estTotalSub')}</p>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                      €{estimatedCost}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight font-bold">
                      Subject to Approval
                  </div>
               </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="md:col-span-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Please correct the highlighted errors above.
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-transform active:scale-[0.99] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('common.processing') : t('booking.confirmRequest')}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;