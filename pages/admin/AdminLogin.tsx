import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LayoutDashboard, ArrowRight, ShieldCheck, AlertCircle, Wand2, KeyRound, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginAdmin } from '../../store/slices/authSlice';
import { supabase } from '../../services/supabase';

type AuthView = 'login' | 'forgot' | 'reset';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [view, setView] = useState<AuthView>('login');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // State for Reset Password Flow
  const [resetEmail, setResetEmail] = useState('');
  const [resetForm, setResetForm] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Listen for Password Recovery Event
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        setView("reset");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Admin Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 1. Authenticate with Supabase Auth (Standard)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      // Helper to handle successful login
      const performLogin = (profile: any) => {
          if (profile.role !== 'admin') {
              throw new Error("Access Denied. This account does not have administrator privileges.");
          }

          dispatch(loginAdmin({
            name: profile.full_name,
            email: profile.email,
            role: 'admin',
            joinDate: profile.join_date
          }));
          navigate('/admin/dashboard');
      };

      // Scenario A: Standard Auth Success
      if (authData.session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user?.id)
          .single();

        if (profileData) {
            performLogin(profileData);
        } else {
             throw new Error("Admin profile not found in database. Check 'profiles' table.");
        }
        return;
      }

      // Scenario B: Auth Failed (Email not confirmed OR Invalid credentials)
      if (authError || !authData.session) {
        // Handle network errors explicitly
        if (authError?.message?.includes('fetch')) {
           throw new Error("Network error: Failed to fetch database. Check your connection.");
        }

        console.warn(`Standard Admin Login Failed: ${authError?.message || "No session"}`);

        // Strategy 1: Check if failure is due to "Email not confirmed"
        if (authError && authError.message.includes("Email not confirmed")) {
             const { data: profileByEmail } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', formData.email)
                .single();

             if (profileByEmail) {
                 performLogin(profileByEmail);
                 return;
             }
        }

        // Strategy 2: Manual Database Check (Fallback)
        const { data: manualProfile, error: manualError } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', formData.email)
          .eq('password', formData.password)
          .single();

        if (manualProfile) {
           performLogin(manualProfile);
           return;
        }

        if (manualError && manualError.code === 'PGRST204') {
             throw new Error("Database error: Missing columns or table. Ensure you ran the SQL setup script.");
        }

        throw new Error("Invalid admin credentials. Please check your email and password.");
      }

    } catch (err: any) {
      console.error("Admin Login Error", err);
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    if (!resetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      setErrors({ resetEmail: 'Valid admin email is required' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin + '/#/admin/login?view=reset',
      });
      
      if (error) throw error;
      
      setView('reset');
      setSuccessMsg('If an account exists, a reset link has been sent.');
    } catch (err: any) {
      setErrors({ resetEmail: err.message || 'Error sending link' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (resetForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (resetForm.newPassword !== resetForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({ password: resetForm.newPassword });
      
      if (error && error.message.includes('Auth session missing') && resetEmail) {
         console.log('Session missing, updating profiles table directly for admin:', resetEmail);
         const { error: profileError } = await supabase
            .from('profiles')
            .update({ password: resetForm.newPassword })
            .eq('email', resetEmail)
            .eq('role', 'admin');
         
         if (profileError) throw profileError;

         setSuccessMsg('Password updated successfully. Please login.');
         setView('login');
         setFormData(prev => ({ ...prev, email: resetEmail }));
         setResetEmail('');
         setResetForm({ newPassword: '', confirmNewPassword: '' });
         setIsLoading(false);
         return;
      }

      if (error) throw error;

      if (data.user) {
         await supabase
            .from('profiles')
            .update({ password: resetForm.newPassword })
            .eq('id', data.user.id);
      }

      setIsLoading(false);
      setView('login');
      setSuccessMsg('Password updated successfully. Please login.');
      
      setFormData(prev => ({ ...prev, email: resetEmail }));
      setResetEmail('');
      setResetForm({ newPassword: '', confirmNewPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Error updating password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        
        {/* Header Section */}
        <div className="text-center">
          <div className="bg-orange-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
             {view === 'login' ? (
              <ShieldCheck className="w-8 h-8 text-orange-500" />
            ) : view === 'forgot' ? (
              <Wand2 className="w-8 h-8 text-orange-500" />
            ) : (
              <KeyRound className="w-8 h-8 text-orange-500" />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {view === 'login' ? 'Admin Portal' : 
             view === 'forgot' ? 'Reset Password' : 
             'Set New Password'}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {view === 'login' ? 'Restricted access. Authorized personnel only.' : 
             view === 'forgot' ? 'Enter admin email to receive a magic link.' : 
             'Create a new secure password for your admin account.'}
          </p>
        </div>

        {/* View: Login Form */}
        {view === 'login' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            {(error || successMsg) && (
              <div className={`${error ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'} border px-4 py-3 rounded-lg text-sm flex items-center gap-2`}>
                {error ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                <span className="leading-tight">{error || successMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="admin@speditionaskari.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button 
                  type="button" 
                  onClick={() => {
                    setView('forgot');
                    setSuccessMsg('');
                    setError('');
                    setErrors({});
                    setResetEmail('');
                  }} 
                  className="font-medium text-orange-500 hover:text-orange-400 bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Authenticating...
                </span>
              ) : 'Access Dashboard'}
              {!isLoading && <LayoutDashboard className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

             <div className="flex items-center justify-between mt-6 text-sm">
               <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                  &larr; Back to Client Login
               </Link>
               <Link to="/admin/signup" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                  Register New Admin
               </Link>
            </div>
          </form>
        )}

        {/* View: Forgot Password (Magic Link Request) */}
        {view === 'forgot' && (
          <form className="mt-8 space-y-6" onSubmit={handleMagicLinkSubmit}>
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="resetEmail"
                  type="email"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.resetEmail ? 'border-red-500' : 'border-slate-700'}`}
                  placeholder="admin@speditionaskari.com"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    if(errors.resetEmail) setErrors({});
                  }}
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              </div>
              {errors.resetEmail && <p className="text-red-400 text-xs mt-1">{errors.resetEmail}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Processing...' : 'Send Magic Link'}
              {!isLoading && <Wand2 className="ml-2 w-4 h-4" />}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setView('login');
                setErrors({});
                setError('');
                setSuccessMsg('');
              }}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </form>
        )}

        {/* View: Reset Password Form */}
        {view === 'reset' && (
          <form className="mt-8 space-y-6" onSubmit={handleResetSubmit}>
             <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={resetForm.newPassword}
                    onChange={(e) => {
                      setResetForm({...resetForm, newPassword: e.target.value});
                      setErrors({});
                    }}
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.newPassword ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
                {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={resetForm.confirmNewPassword}
                    onChange={(e) => {
                      setResetForm({...resetForm, confirmNewPassword: e.target.value});
                      setErrors({});
                    }}
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.confirmNewPassword ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
                {errors.confirmNewPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmNewPassword}</p>}
              </div>
             </div>

             <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Processing...' : 'Set New Password'}
            </button>

            <button
              type="button"
              onClick={() => {
                setView('login');
                setErrors({});
                setError('');
                setSuccessMsg('');
              }}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default AdminLogin;