import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { User, Save, X } from 'lucide-react';
=======
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react';
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateClientProfile } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

const EditProfile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth.client);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email, phone: user.phone || '', address: user.address || '' });
  }, [user]);
=======
  const [msg, setMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Profile Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
      });
    } else {
        navigate('/login');
    }
  }, [user, navigate]);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
<<<<<<< HEAD
    try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const profileUpdates = { full_name: formData.name, phone: formData.phone, address: formData.address };
        if (authUser) await supabase.from('profiles').update(profileUpdates).eq('id', authUser.id);
        else if (user?.email) await supabase.from('profiles').update(profileUpdates).eq('email', user.email);
        dispatch(updateClientProfile({ name: formData.name, phone: formData.phone, address: formData.address }));
        navigate('/profile');
    } finally { setIsLoading(false); }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">{t('profile.editPage.title')}</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6 shadow-sm border border-gray-100">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('profile.editPage.nameLabel')}</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-blue-500 outline-none" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('profile.editPage.phoneLabel')}</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex gap-4">
                <button type="button" onClick={() => navigate('/profile')} className="px-6 py-2.5 font-bold text-gray-500">{t('common.cancel')}</button>
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2">
                    <Save className="w-4 h-4" /> {isLoading ? t('common.processing') : t('common.saveChanges')}
=======
    setMsg(null);

    try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        // Prepare common profile updates
        const profileUpdates = {
            full_name: formData.name,
            phone: formData.phone,
            address: formData.address
        };

        if (authUser) {
            // --- SCENARIO A: Standard Auth Session (Logged in via Supabase) ---

            // 1. Update Profile in 'profiles' table using ID
            const { error: profileError } = await supabase
                .from('profiles')
                .update(profileUpdates)
                .eq('id', authUser.id);

            if (profileError) throw profileError;

        } else if (user && user.email) {
            // --- SCENARIO B: Manual Login Fallback (No Supabase Session) ---
            
            // 1. Update Profile in 'profiles' table using Email
            const { error: profileError } = await supabase
                .from('profiles')
                .update(profileUpdates)
                .eq('email', user.email);

            if (profileError) throw profileError;
        } else {
            throw new Error("You must be logged in to update your profile.");
        }

        // 3. Update Local State (Redux)
        dispatch(updateClientProfile({
            name: formData.name,
            phone: formData.phone,
            address: formData.address
        }));

        setMsg({ type: 'success', text: 'Profile updated successfully!' });
        
        // Redirect after short delay
        setTimeout(() => navigate('/profile'), 1500);

    } catch (err: any) {
        console.error("Update error:", err);
        setMsg({ type: 'error', text: err.message || "Failed to update profile." });
    } finally {
        setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-slate-900">{t('profile.editPage.title')}</h1>
               <p className="text-gray-600 mt-2">{t('profile.editPage.subtitle')}</p>
            </div>
            <button 
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white rounded-full transition-colors text-gray-500"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            
            {msg && (
                <div className={`p-4 rounded-lg text-sm ${msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {msg.text}
                </div>
            )}

            {/* General Info Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2">General Information</h3>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.name')}</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-black"
                        />
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.email')}</label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black bg-gray-50 cursor-not-allowed"
                            readOnly
                        />
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.phone')}</label>
                    <div className="relative">
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-black"
                        />
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.address')}</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-black"
                        />
                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <button 
                    type="button" 
                    onClick={() => navigate('/profile')}
                    className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {t('common.cancel')}
                </button>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                    {isLoading ? t('common.processing') : (
                        <>
                            <Save className="w-4 h-4" />
                            {t('common.saveChanges')}
                        </>
                    )}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;