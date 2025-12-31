import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Clock,
  LogOut,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logoutClient } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth.client);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    dispatch(logoutClient());
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('profile.deleteConfirm'))) {
      try {
        setIsDeleting(true);
        if (user?.email) await supabase.from('profiles').delete().eq('email', user.email);
        await supabase.auth.signOut();
        dispatch(logoutClient());
        navigate('/');
      } finally { setIsDeleting(false); }
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-lg">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-4xl border-4 border-blue-50">{user.name.charAt(0)}</div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-8 text-center">
            <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-blue-100/50">{user.role === 'Premium Client' ? t('profile.mockUser.role') : user.role}</span>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{t('common.email')}</p>
                <p className="text-sm font-bold text-slate-800">{user.email}</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{t('common.phone')}</p>
                <p className="text-sm font-bold text-slate-800">{user.phone || '-'}</p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-50 pt-10">
              <button onClick={() => navigate('/edit-profile')} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2">
                <Edit className="w-4 h-4" /> {t('profile.editProfile')}
              </button>
              <button onClick={handleLogout} className="w-full sm:w-auto bg-white border border-gray-200 text-slate-700 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-50">
                <LogOut className="w-4 h-4" /> {t('common.logout')}
              </button>
            </div>
            <button onClick={handleDeleteAccount} className="mt-8 text-red-400 hover:text-red-600 text-xs font-bold uppercase">{t('profile.deleteAccount')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;