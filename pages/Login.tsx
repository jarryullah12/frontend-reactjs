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

  // Listen for Password Recovery Event
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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: formData.password
      });

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

      if (authData.session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user?.id)
          .single();
        
        if (profileData) {
            performLogin(profileData);
        } else {
            performLogin({ email: email }); 
        }
        return;
      }

      if (authError || !authData.session) {
        if (authError && authError.message.includes("Email not confirmed")) {
             const { data: profileByEmail } = await supabase
                .from('profiles')
                .select('*')
                .ilike('email', email)
                .single();

             if (profileByEmail) {
                 performLogin(profileByEmail);
                 return;
             }
        }
        
        const { data: manualProfile } = await supabase
          .from('profiles')
          .select('*')
          .ilike('email', email)
          .eq('password', formData.password)
          .single();

        if (manualProfile) {
           performLogin(manualProfile);
           return;
        }

        throw authError || new Error("Login failed. Please check your email and password.");
      }

    } catch (err: any) {
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
      setView('reset');
      setSuccessMsg('If an account exists, a reset link has been sent.');
    } catch (err: any) {
      setError(err.message || 'Error sending reset link');
    } finally {
       setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (resetForm.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (resetForm.newPassword !== resetForm.confirmNewPassword) newErrors.confirmNewPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const email = resetEmail.trim().toLowerCase();

    try {
      const { data, error } = await supabase.auth.updateUser({ password: resetForm.newPassword });

      if (error && error.message.includes('Auth session missing') && email) {
         const { error: profileError } = await supabase
            .from('profiles')
            .update({ password: resetForm.newPassword })
            .eq('email', email);
         if (profileError) throw profileError;
         setSuccessMsg(t('auth.passwordUpdated'));
         setView('login');
         setIsLoading(false);
         return;
      }

      if (error) throw error;
      if (data.user) {
         await supabase.from('profiles').update({ password: resetForm.newPassword }).eq('id', data.user.id);
      }

      setIsLoading(false);
      setView('login');
      setSuccessMsg(t('auth.passwordUpdated'));
    } catch (err: any) {
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
        
          <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-1767017985921.png?width=8000&height=8000&resize=contain" 
                  alt="Logo" 
                  className="h-32 w-auto"
                />
              </div>
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
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                  className="font-medium text-blue-600 hover:text-blue-500 bg-transparent border-none p-0 cursor-pointer"
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
                <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500">
                  {t('common.signup')}
                </Link>
              </p>
              
  
            </div>
          </form>
        )}

        {/* View: Forgot Password Form - Blue theme */}
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
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.resetEmail ? 'border-red-500' : 'border-gray-300'}`}
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
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

        {/* View: Reset Password Form - Blue Theme */}
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
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
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