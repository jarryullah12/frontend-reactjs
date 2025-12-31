import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { VehicleType, PRICING, VEHICLE_CATEGORIES } from '../types';
import { Send, MapPin, Truck, Calendar, AlertCircle, CheckCircle, CreditCard, Clock, Receipt, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOrder } from '../store/slices/adminSlice';
import { supabase } from '../services/supabase';

const Booking: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector(state => state.auth.client);

  const preSelectedVehicle = searchParams.get('vehicle') as VehicleType | null;
  const preSelectedDistance = searchParams.get('distance');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    pickup: '',
    pickup_time: '',
    dropoff: '',
    delivery_time: '',
    billing_address: user?.address || '',
    distance: preSelectedDistance || '',
    vehicle: preSelectedVehicle || VehicleType.EXPRESS_SMALL_VAN,
    date: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('booking.errors.required').replace('{{field}}', t('common.name'));
    if (!formData.email.trim()) newErrors.email = t('booking.errors.required').replace('{{field}}', t('common.email'));
    if (!formData.phone.trim()) newErrors.phone = t('booking.errors.required').replace('{{field}}', t('common.phone'));
    if (!formData.date) newErrors.date = t('booking.errors.required').replace('{{field}}', t('common.date'));
    if (!formData.pickup.trim()) newErrors.pickup = t('booking.errors.pickup');
    if (!formData.pickup_time.trim()) newErrors.pickup_time = t('booking.errors.pickupTime');
    if (!formData.dropoff.trim()) newErrors.dropoff = t('booking.errors.dropoff');
    if (!formData.delivery_time.trim()) newErrors.delivery_time = t('booking.errors.deliveryTime');
    if (!formData.billing_address.trim()) newErrors.billing_address = t('booking.errors.billing');
    if (!formData.distance) newErrors.distance = t('booking.errors.required').replace('{{field}}', t('common.distance'));

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
      date: formData.date,
      pickup: formData.pickup,
      pickup_time: formData.pickup_time,
      dropoff: formData.dropoff,
      delivery_time: formData.delivery_time,
      billing_address: formData.billing_address,
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
  
          if (data && data[0]) {
            dispatch(addOrder(data[0]));
  
            // Send Email via Resend API
            const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
  
            if (resendApiKey) {
              const emailContent = `
Sehr geehrte Damen und Herren,

folgender Transport wurde gebucht:

Order Details:
--------------
Order ID: ${data[0].id}
Client: ${newOrderObj.client}
Email: ${newOrderObj.email}
Phone: ${newOrderObj.phone}
Date: ${newOrderObj.date}
Vehicle: ${newOrderObj.vehicle}
Route: ${newOrderObj.route}
Pickup: ${newOrderObj.pickup} at ${newOrderObj.pickup_time}
Dropoff: ${newOrderObj.dropoff} at ${newOrderObj.delivery_time}
Amount: ${newOrderObj.amount}
              `.trim();

              try {
                await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`,
                  },
                  body: JSON.stringify({
                    from: 'Spedition Askari <onboarding@resend.dev>',
                    to: ['jarryullah46@gmail.com'],
                    subject: 'Neue Transportbuchung - Spedition Askari',
                    text: emailContent,
                  }),
                });
              } catch (emailErr) {
                console.error("Failed to send email via Resend:", emailErr);
              }
            }
          }
  
          // Redirect to orders page immediately after successful booking
        navigate('/orders');
    } catch (err: any) {
      console.error("Booking submission error:", err);
      alert("Failed to submit booking: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t('booking.title')}</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">{t('booking.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 p-6 text-white text-center">
            <p className="text-sm opacity-80 uppercase tracking-widest font-black">{t('booking.formTitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Contact Details */}
            <section className="space-y-6">
              <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-600" /> {t('booking.contactDetails')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 ${errors.name ? 'border-red-500' : 'border-gray-200'}`} placeholder={t('booking.placeholders.name')} />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder={t('common.email')} />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder={t('booking.placeholders.phone')} />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.date')}</label>
                  <div className="relative">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 ${errors.date ? 'border-red-500' : 'border-gray-200'}`} />
                    <Calendar className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.date && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.date}</p>}
                </div>
              </div>
            </section>

            {/* Transport Details */}
            <section className="space-y-6">
              <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" /> {t('booking.transportDetails')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('booking.pickupAddress')}</label>
                  <div className="relative">
                    <input type="text" name="pickup" value={formData.pickup} onChange={handleChange} className="w-full p-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" placeholder={t('booking.placeholders.address')} />
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('booking.pickupTime')}</label>
                  <div className="relative">
                    <input type="time" name="pickup_time" value={formData.pickup_time} onChange={handleChange} className="w-full p-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" />
                    <Clock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('booking.dropoffAddress')}</label>
                  <div className="relative">
                    <input type="text" name="dropoff" value={formData.dropoff} onChange={handleChange} className="w-full p-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" placeholder={t('booking.placeholders.address')} />
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('booking.deliveryTime')}</label>
                  <div className="relative">
                    <input type="time" name="delivery_time" value={formData.delivery_time} onChange={handleChange} className="w-full p-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" />
                    <Clock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('booking.billingAddress')}</label>
                <div className="relative">
                  <input type="text" name="billing_address" value={formData.billing_address} onChange={handleChange} className="w-full p-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" placeholder={t('booking.placeholders.billing')} />
                  <Receipt className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.distance')} ({t('common.km')})</label>
                  <input type="number" name="distance" value={formData.distance} onChange={handleChange} className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" placeholder="e.g. 250" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">{t('common.vehicle')}</label>
                  <select name="vehicle" value={formData.vehicle} onChange={handleChange} className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 appearance-none">
                    {Object.entries(VEHICLE_CATEGORIES).map(([cat, types]) => (
                      <optgroup key={cat} label={t(`vehicleCategories.${cat}`)}>
                        {types.map(type => <option key={type} value={type}>{t(`vehicleTypes.${type}`)}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Summary & Submit */}
            <section className="pt-6 border-t border-gray-100">
              <div className="bg-slate-50 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border border-gray-100 shadow-inner">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('booking.estTotal')}</span>
                  <p className="text-xs text-gray-500 font-medium">{t('booking.estTotalSub')}</p>
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">€{estimatedCost}</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4.5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><Send className="w-6 h-6" /> {t('booking.confirmRequest')}</>
                )}
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;