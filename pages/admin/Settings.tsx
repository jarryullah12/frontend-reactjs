import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Save, User, Shield, Trash2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateAdminProfile, logoutAdmin } from '../../store/slices/authSlice';
import { supabase } from '../../services/supabase';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
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
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <AdminLayout title={t('admin.settings')}>
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
             </button>
          </div>
        </div>

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

      </div>
    </AdminLayout>
  );
};

export default Settings;