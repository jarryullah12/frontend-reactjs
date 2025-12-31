import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { VehicleType, PRICING, VEHICLE_CATEGORIES } from '../types';
<<<<<<< HEAD
import { Send, MapPin, Truck, Calendar, AlertCircle, CheckCircle, CreditCard, Clock, Receipt, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
=======
import { Send, MapPin, Truck, Calendar, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch } from '../store/hooks';
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
import { addOrder } from '../store/slices/adminSlice';
import { supabase } from '../services/supabase';

const Booking: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
<<<<<<< HEAD
  const { user } = useAppSelector(state => state.auth.client);

=======
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  const preSelectedVehicle = searchParams.get('vehicle') as VehicleType | null;
  const preSelectedDistance = searchParams.get('distance');

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    pickup: '',
    pickup_time: '',
    dropoff: '',
    delivery_time: '',
    billing_address: user?.address || '',
=======
    name: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    distance: preSelectedDistance || '',
    vehicle: preSelectedVehicle || VehicleType.EXPRESS_SMALL_VAN,
    date: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
<<<<<<< HEAD

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
=======
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
<<<<<<< HEAD
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
=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
  const estimatedCost = formData.distance ?
    (PRICING[formData.vehicle as VehicleType].basePrice + (PRICING[formData.vehicle as VehicleType].pricePerKm * parseFloat(formData.distance.toString()))).toFixed(2)
=======
  const estimatedCost = formData.distance ? 
    (PRICING[formData.vehicle as VehicleType].basePrice + (PRICING[formData.vehicle as VehicleType].pricePerKm * parseFloat(formData.distance.toString()))).toFixed(2) 
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    : '0.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!validateForm()) return;
    setIsSubmitting(true);

=======
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    const newOrderObj = {
      client: formData.name,
      email: formData.email,
      phone: formData.phone,
<<<<<<< HEAD
      date: formData.date,
      pickup: formData.pickup,
      pickup_time: formData.pickup_time,
      dropoff: formData.dropoff,
      delivery_time: formData.delivery_time,
      billing_address: formData.billing_address,
=======
      date: formData.date || new Date().toLocaleDateString(),
      pickup: formData.pickup,
      dropoff: formData.dropoff,
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      distance: formData.distance.toString(),
      route: `${formData.pickup.split(',')[0]} -> ${formData.dropoff.split(',')[0]}`,
      amount: `€${estimatedCost}`,
      status: 'Pending Review',
      vehicle: t(`vehicleTypes.${formData.vehicle}`)
    };

<<<<<<< HEAD
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
=======
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

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;