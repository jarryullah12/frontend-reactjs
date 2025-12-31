import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
<<<<<<< HEAD
  Clock,
  LogOut,
  Trash2
=======
  Shield,
  Clock,
  Settings,
  LogOut,
  Trash2,
  User as UserIcon
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
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
<<<<<<< HEAD
    if (window.confirm(t('profile.deleteConfirm'))) {
=======
    if (window.confirm("Delete your account? This cannot be undone.")) {
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      try {
        setIsDeleting(true);
        if (user?.email) await supabase.from('profiles').delete().eq('email', user.email);
        await supabase.auth.signOut();
        dispatch(logoutClient());
        navigate('/');
<<<<<<< HEAD
      } finally { setIsDeleting(false); }
=======
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsDeleting(false);
      }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-lg">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-4xl border-4 border-blue-50">{user.name.charAt(0)}</div>
=======
        
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
          
          {/* Decorative Header */}
          <div className="bg-slate-900 h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent"></div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-lg">
                <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-black text-4xl border-4 border-orange-50">
                  {user.name.charAt(0)}
                </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-8 text-center">
<<<<<<< HEAD
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
=======
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-orange-100/50">
                {user.role || 'Client Account'}
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> Member since {user.joinDate || '2024'}
              </span>
            </div>

            {/* Information Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-orange-600 shadow-sm transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Email</p>
                </div>
                <p className="text-sm font-bold text-slate-800 ml-9">{user.email}</p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-orange-600 shadow-sm transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                </div>
                <p className="text-sm font-bold text-slate-800 ml-9">{user.phone || 'Not provided'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group sm:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-orange-600 shadow-sm transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office / Delivery Address</p>
                </div>
                <p className="text-sm font-bold text-slate-800 ml-9">{user.address || 'Address not set'}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-50 pt-10">
              <button 
                onClick={() => navigate('/edit-profile')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
              >
                <Edit className="w-4 h-4" /> Edit My Details
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-700 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            <div className="mt-8 pt-6">
              <button 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="text-red-400 hover:text-red-600 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isDeleting ? 'Processing...' : 'Delete My Account Permanently'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-12 font-medium">
          Manage your personal data and account security. <br />
          For order history, please visit the <strong className="text-slate-500">Orders</strong> section.
        </p>

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      </div>
    </div>
  );
};

export default Profile;