import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Save, User, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateAdminProfile, logoutAdmin } from '../../store/slices/authSlice';
import { supabase } from '../../services/supabase';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth.admin);
  
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email });
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await supabase.from('profiles').update({ full_name: formData.name }).eq('id', authUser.id);
      } else if (user?.email) {
        await supabase.from('profiles').update({ full_name: formData.name }).eq('email', user.email);
      }
      dispatch(updateAdminProfile({ name: formData.name }));
      alert(t('settings.profile.success'));
    } catch (err: any) {
      alert(t('settings.profile.error') + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('settings.dangerZone.deleteConfirm'))) {
      setIsSaving(true);
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          // Attempt to delete from public.profiles
          await supabase.from('profiles').delete().eq('id', authUser.id);
          // Sign out
          await supabase.auth.signOut();
        } else if (user?.email) {
          await supabase.from('profiles').delete().eq('email', user.email);
        }
        dispatch(logoutAdmin());
        navigate('/admin/login');
      } catch (err: any) {
        alert(t('settings.dangerZone.error') + err.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <AdminLayout title={t('admin.settings')}>
      <div className="w-full space-y-8">
        {/* Admin Profile Section - Full Width */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> {t('settings.profile.title')}
            </h3>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
              {t('settings.profile.administrator')}
            </span>
          </div>
          
          <div className="p-8 space-y-6">
             <div className="max-w-4xl">
                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">{t('settings.profile.fullName')}</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg bg-white text-black font-bold transition-all shadow-sm" 
                  placeholder={t('settings.profile.placeholder')}
                />
             </div>
             
             <div className="max-w-4xl">
                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">{t('settings.profile.email')}</label>
                <input 
                  type="text" 
                  value={formData.email} 
                  readOnly 
                  className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 text-lg cursor-not-allowed font-medium" 
                />
                <p className="text-[10px] text-gray-400 mt-2 uppercase font-black tracking-widest px-1">{t('settings.profile.emailLocked')}</p>
             </div>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-gray-100 flex justify-end">
             <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-blue-600 text-white px-10 py-3.5 rounded-xl text-sm font-black hover:bg-blue-700 flex items-center gap-3 shadow-xl shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
             >
               {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
               {isSaving ? t('settings.profile.updating') : t('settings.profile.saveChanges')}
             </button>
          </div>
        </div>

        {/* Delete Account Section - Replacing Security Section */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden w-full">
          <div className="p-6 border-b border-red-50">
            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> {t('settings.dangerZone.title')}
            </h3>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                </div>
                <div>
                  <p className="text-base font-black text-red-900">{t('settings.dangerZone.deleteAccount')}</p>
                  <p className="text-sm text-red-700 mt-1 leading-relaxed">
                    {t('settings.dangerZone.deleteDesc')}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleDeleteAccount}
                disabled={isSaving}
                className="whitespace-nowrap bg-red-600 text-white px-8 py-3.5 rounded-xl text-sm font-black hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> {t('settings.dangerZone.deleteBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;