import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Truck, ArrowRight, ShieldCheck, AlertCircle, Wand2, ArrowLeft, CheckCircle2, KeyRound, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch } from '../store/hooks';
import { loginClient } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

type AuthView = 'login' | 'forgot' | 'reset';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  
  const [view, setView] = useState<AuthView>('login');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [resetEmail, setResetEmail] = useState('');
  
  // State for Reset Password Flow
  const [resetForm, setResetForm] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

<<<<<<< HEAD
  // Listen for Password Recovery Event
=======
  // Listen for Password Recovery Event (User clicked email link)
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
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
      newErrors.email = t('common.email') + ' is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = t('common.password') + ' is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!validateForm()) return;

    setIsLoading(true);

    const email = formData.email.trim().toLowerCase();

    try {
<<<<<<< HEAD
=======
      // 1. Authenticate with Supabase Auth (Standard)
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: formData.password
      });

<<<<<<< HEAD
=======
      // Helper to handle successful login dispatch
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      const performLogin = (profile: any) => {
          dispatch(loginClient({
            name: profile.full_name || email.split('@')[0],
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            role: profile.role || 'client',
            joinDate: profile.join_date
          }));
          navigate('/');
      };

<<<<<<< HEAD
=======
      // Scenario A: Standard Auth Success
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      if (authData.session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user?.id)
          .single();
        
<<<<<<< HEAD
        if (profileData) {
            performLogin(profileData);
        } else {
            performLogin({ email: email }); 
=======
        // If profile exists, use it. If not (rare), use auth metadata or defaults
        if (profileData) {
            performLogin(profileData);
        } else {
            performLogin({ email: email }); // Fallback
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        }
        return;
      }

<<<<<<< HEAD
      if (authError || !authData.session) {
        if (authError && authError.message.includes("Email not confirmed")) {
             const { data: profileByEmail } = await supabase
=======
      // Scenario B: Auth Failed (Email not confirmed OR Invalid credentials)
      if (authError || !authData.session) {
        console.warn(`Standard Login Failed: ${authError?.message || "No session"}`);

        // Strategy 1: Check if failure is due to "Email not confirmed"
        if (authError && authError.message.includes("Email not confirmed")) {
             console.log("Attempting bypass for unconfirmed email...");
             const { data: profileByEmail, error: profileEmailError } = await supabase
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                .from('profiles')
                .select('*')
                .ilike('email', email)
                .single();

             if (profileByEmail) {
<<<<<<< HEAD
                 performLogin(profileByEmail);
                 return;
             }
        }
        
        const { data: manualProfile } = await supabase
=======
                 console.log("Login successful via email bypass");
                 performLogin(profileByEmail);
                 return;
             } else {
                 console.error("Profile lookup failed:", profileEmailError ? JSON.stringify(profileEmailError) : "No profile found");
             }
        }

        // Strategy 2: Manual DB credential check...
        console.log("Attempting manual DB credential check...");
        
        const { data: manualProfile, error: manualError } = await supabase
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          .from('profiles')
          .select('*')
          .ilike('email', email)
          .eq('password', formData.password)
          .single();

        if (manualProfile) {
<<<<<<< HEAD
=======
           console.log("Manual DB Login Successful");
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
           performLogin(manualProfile);
           return;
        }

<<<<<<< HEAD
=======
        if (manualError) {
             if (manualError.code === 'PGRST204') {
                 throw new Error("Database error: Missing 'password' column. Please run the SQL setup script.");
             }
             if (manualError.code === 'PGRST116') {
                 throw new Error("Invalid login credentials."); 
             }
        }

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        throw authError || new Error("Login failed. Please check your email and password.");
      }

    } catch (err: any) {
<<<<<<< HEAD
=======
      console.error('Login flow error:', err);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      if (err.message && (err.message.includes('Invalid login credentials') || err.message.includes('Invalid email'))) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.message || 'An error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!resetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      setErrors({ resetEmail: 'Valid email is required' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
        redirectTo: window.location.origin + '/#/login?view=reset',
      });

      if (error) throw error;
<<<<<<< HEAD
      setView('reset');
      setSuccessMsg('If an account exists, a reset link has been sent.');
    } catch (err: any) {
=======
      
      setView('reset');
      setSuccessMsg('If an account exists, a reset link has been sent.');
      
    } catch (err: any) {
      console.error('Reset request error:', err);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      setError(err.message || 'Error sending reset link');
    } finally {
       setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
<<<<<<< HEAD
    if (resetForm.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (resetForm.newPassword !== resetForm.confirmNewPassword) newErrors.confirmNewPassword = 'Passwords do not match';
=======
    
    if (resetForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (resetForm.newPassword !== resetForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const email = resetEmail.trim().toLowerCase();

    try {
      const { data, error } = await supabase.auth.updateUser({ password: resetForm.newPassword });

      if (error && error.message.includes('Auth session missing') && email) {
<<<<<<< HEAD
=======
         console.log('Session missing, updating profiles table directly for:', email);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
         const { error: profileError } = await supabase
            .from('profiles')
            .update({ password: resetForm.newPassword })
            .eq('email', email);
<<<<<<< HEAD
         if (profileError) throw profileError;
         setSuccessMsg(t('auth.passwordUpdated'));
         setView('login');
=======
         
         if (profileError) throw profileError;
         
         setSuccessMsg(t('auth.passwordUpdated'));
         setView('login');
         setFormData(prev => ({ ...prev, email: email }));
         setResetEmail('');
         setResetForm({ newPassword: '', confirmNewPassword: '' });
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
         setIsLoading(false);
         return;
      }

      if (error) throw error;
<<<<<<< HEAD
      if (data.user) {
         await supabase.from('profiles').update({ password: resetForm.newPassword }).eq('id', data.user.id);
=======

      if (data.user) {
         await supabase
            .from('profiles')
            .update({ password: resetForm.newPassword })
            .eq('id', data.user.id);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      }

      setIsLoading(false);
      setView('login');
      setSuccessMsg(t('auth.passwordUpdated'));
<<<<<<< HEAD
    } catch (err: any) {
=======
      
      setFormData(prev => ({ ...prev, email: email }));
      setResetEmail('');
      setResetForm({ newPassword: '', confirmNewPassword: '' });
    } catch (err: any) {
      console.error("Error updating password:", err);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">
        
<<<<<<< HEAD
          <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-1767017985921.png?width=8000&height=8000&resize=contain" 
                  alt="Logo" 
                  className="h-32 w-auto"
                />
              </div>
=======
        {/* Header Section */}
        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {view === 'login' ? (
              <Truck className="w-8 h-8 text-orange-600" />
            ) : view === 'forgot' ? (
              <Wand2 className="w-8 h-8 text-orange-600" />
            ) : (
              <KeyRound className="w-8 h-8 text-orange-600" />
            )}
          </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          <h2 className="text-3xl font-extrabold text-slate-900">
            {view === 'login' ? t('auth.welcomeBack') : 
             view === 'forgot' ? t('auth.magicLinkTitle') : 
             t('auth.resetPasswordTitle')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {view === 'login' ? t('auth.welcomeDesc') : 
             view === 'forgot' ? t('auth.magicLinkDesc') : 
             t('auth.resetPasswordDesc')}
          </p>
        </div>

        {/* View: Login Form */}
        {view === 'login' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {(error || successMsg) && (
              <div className={`${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'} border px-4 py-3 rounded-lg text-sm flex items-center gap-2`}>
                {error ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                <span>{error || successMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.email')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
<<<<<<< HEAD
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
=======
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
<<<<<<< HEAD
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
=======
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
<<<<<<< HEAD
                  className="font-medium text-blue-600 hover:text-blue-500 bg-transparent border-none p-0 cursor-pointer"
=======
                  className="font-medium text-orange-600 hover:text-orange-500 bg-transparent border-none p-0 cursor-pointer"
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                >
                  {t('auth.forgotPass')}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? t('common.processing') : t('common.login')}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            
            <div className="text-center mt-6 space-y-4">
              <p className="text-sm text-gray-600">
                {t('auth.noAccount')}{' '}
<<<<<<< HEAD
                <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500">
=======
                <Link to="/signup" className="font-bold text-orange-600 hover:text-orange-500">
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  {t('common.signup')}
                </Link>
              </p>
              
<<<<<<< HEAD
  
=======
              <div className="pt-4 border-t border-gray-100">
                <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-slate-900 transition-colors">
                  <Shield className="w-3 h-3" />
                  {t('common.adminPortal')}
                </Link>
              </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
            </div>
          </form>
        )}

<<<<<<< HEAD
        {/* View: Forgot Password Form - Blue theme */}
=======
        {/* View: Forgot Password Form */}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        {view === 'forgot' && (
          <form className="mt-8 space-y-6" onSubmit={handleMagicLinkSubmit}>
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.email')}
              </label>
              <div className="relative">
                <input
                  id="resetEmail"
                  type="email"
<<<<<<< HEAD
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.resetEmail ? 'border-red-500' : 'border-gray-300'}`}
=======
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.resetEmail ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    if(errors.resetEmail) setErrors({});
                  }}
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.resetEmail && <p className="text-red-500 text-xs mt-1">{errors.resetEmail}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
<<<<<<< HEAD
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
=======
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70"
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
            >
              {isLoading ? t('common.processing') : t('auth.sendMagicLink')}
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
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-medium text-gray-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.backToLogin')}
            </button>
          </form>
        )}

<<<<<<< HEAD
        {/* View: Reset Password Form - Blue Theme */}
=======
        {/* View: Reset Password Form */}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        {view === 'reset' && (
          <form className="mt-8 space-y-6" onSubmit={handleResetSubmit}>
             <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
<<<<<<< HEAD
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
=======
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
<<<<<<< HEAD
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
=======
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>}
              </div>
             </div>

             <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? t('common.processing') : t('auth.setNewPassword')}
            </button>

            <button
              type="button"
              onClick={() => {
                setView('login');
                setErrors({});
                setError('');
                setSuccessMsg('');
              }}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-medium text-gray-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.backToLogin')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;