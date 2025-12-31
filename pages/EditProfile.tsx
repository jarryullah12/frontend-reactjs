import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, X } from 'lucide-react';
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email, phone: user.phone || '', address: user.address || '' });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;