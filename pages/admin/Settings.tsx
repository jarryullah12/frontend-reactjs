import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
<<<<<<< HEAD
import { Save, User, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';
=======
import { Save, User, Shield, Trash2, AlertTriangle } from 'lucide-react';
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateAdminProfile, logoutAdmin } from '../../store/slices/authSlice';
import { supabase } from '../../services/supabase';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
<<<<<<< HEAD
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
=======
  // Selector updated to target admin auth
  const { user } = useAppSelector(state => state.auth.admin);
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      let updateError = null;

      if (authUser) {
        // Scenario A: Standard Auth Session -> Update by ID
        const { error } = await supabase
          .from('profiles')
          .update({ full_name: formData.name })
          .eq('id', authUser.id);
        updateError = error;
      } else if (user && user.email) {
        // Scenario B: Manual Login (No Auth Session) -> Update by Email from Redux
        const { error } = await supabase
          .from('profiles')
          .update({ full_name: formData.name })
          .eq('email', user.email);
        updateError = error;
      } else {
        throw new Error("Session expired. Please login again.");
      }

      if (updateError) throw updateError;

      // 2. Update Persistent Storage (site_admins) if used
      if (user) {
        try {
            const existingAdminsStr = localStorage.getItem('site_admins');
            if (existingAdminsStr) {
                const existingAdmins = JSON.parse(existingAdminsStr);
                const adminIndex = existingAdmins.findIndex((a: any) => a.email === user.email);
                
                if (adminIndex !== -1) {
                    existingAdmins[adminIndex] = {
                        ...existingAdmins[adminIndex],
                        name: formData.name
                    };
                    localStorage.setItem('site_admins', JSON.stringify(existingAdmins));
                }
            }
        } catch (err) {
            console.warn("Local storage update failed", err);
        }
      }

      // 3. Update Redux State
      dispatch(updateAdminProfile({
        name: formData.name,
        // We do not update email in Redux if we didn't update it in Auth (which requires re-verification)
      }));
      
      alert("Admin profile updated successfully!");

    } catch (err: any) {
      console.error("Failed to update profile", err);
      alert("Error updating profile: " + err.message);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
<<<<<<< HEAD
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
=======
    const confirmMessage = "Are you sure you want to delete your ADMIN account? This action is permanent and cannot be undone.";
    if (window.confirm(confirmMessage)) {
      try {
        setIsSaving(true);
        
        // 1. Identify user from Auth (if available)
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        // 2. Perform Deletion
        let deleteError = null;

        // Priority 1: Delete by Email (from Redux state)
        // We trust the local user state email because it's what the user is currently seeing/using
        if (user?.email) {
            console.log("Attempting delete by email:", user.email);
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('email', user.email);
            deleteError = error;
        } 
        // Priority 2: Delete by Auth ID (Fallback if local state email is missing)
        else if (authUser) {
            console.log("Attempting delete by auth ID:", authUser.id);
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', authUser.id);
            deleteError = error;
        }

        if (deleteError) {
            throw deleteError;
        }

        // 3. Sign out from Supabase if session existed
        if (authUser) {
           await supabase.auth.signOut();
        }

        // 4. Clear Local State & Redirect
        dispatch(logoutAdmin());
        navigate('/');
        
      } catch (err: any) {
        console.error("Error deleting account:", err);
        alert(`Failed to delete account: ${err.message || 'Unknown error'}`);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <AdminLayout title={t('admin.settings')}>
<<<<<<< HEAD
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
=======
      <div className="w-full">
        
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 w-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-600" />
              Admin Profile
            </h3>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> Administrator
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
               <input 
                 type="text" 
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-slate-900" 
                 placeholder="Enter your full name"
               />
            </div>
            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.email')}</label>
               <input 
                 type="email" 
                 name="email"
                 value={formData.email}
                 readOnly
                 className="w-full p-2.5 border border-gray-200 rounded-lg outline-none text-sm bg-gray-50 text-gray-500 cursor-not-allowed" 
               />
               <p className="text-xs text-gray-400 mt-1">Email address cannot be changed directly to ensure account security.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 text-right rounded-b-xl border-t border-gray-100">
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 ml-auto disabled:opacity-70 shadow-sm"
             >
               <Save className="w-4 h-4" /> 
               {isSaving ? 'Saving...' : 'Save Changes'}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
             </button>
          </div>
        </div>

<<<<<<< HEAD
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
=======
        {/* Delete Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 w-full overflow-hidden">
          <div className="p-6 border-b border-red-50 bg-red-50/30">
            <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your admin account, there is no going back. Please be certain.
            </p>
            <button 
              onClick={handleDeleteAccount}
              disabled={isSaving}
              className="bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> 
              Delete Admin Account
            </button>
          </div>
        </div>

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      </div>
    </AdminLayout>
  );
};

export default Settings;