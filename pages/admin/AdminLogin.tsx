import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LayoutDashboard, ArrowRight, ShieldCheck, AlertCircle, Wand2, KeyRound, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginAdmin } from '../../store/slices/authSlice';
import { supabase } from '../../services/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

type AuthView = 'login' | 'forgot' | 'reset';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  
  const [view, setView] = useState<AuthView>('login');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [resetEmail, setResetEmail] = useState('');
  const [resetForm, setResetForm] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") setView("reset");
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = t('admin.login.emailRequired');
    if (!formData.password) newErrors.password = t('admin.login.passwordRequired');
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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      const performLogin = (profile: any) => {
          if (profile.role !== 'admin') throw new Error(t('admin.login.denied'));
          dispatch(loginAdmin({
            name: profile.full_name,
            email: profile.email,
            role: 'admin',
            joinDate: profile.join_date
          }));
          navigate('/admin/dashboard');
      };

      if (authData.session) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', authData.user?.id).single();
        if (profileData) performLogin(profileData);
        return;
      }

      if (authError || !authData.session) {
        const { data: manualProfile } = await supabase.from('profiles').select('*').eq('email', formData.email).eq('password', formData.password).single();
        if (manualProfile) {
           performLogin(manualProfile);
           return;
        }
        throw new Error(t('admin.login.invalid'));
      }
    } catch (err: any) {
      setError(err.message || t('admin.login.invalid'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        
        {/* Header Section - Now Blue */}
        <div className="text-center">
          <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
             {view === 'login' ? (
              <ShieldCheck className="w-8 h-8 text-blue-500" />
            ) : view === 'forgot' ? (
              <Wand2 className="w-8 h-8 text-blue-500" />
            ) : (
              <KeyRound className="w-8 h-8 text-blue-500" />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {view === 'login' ? t('admin.login.title') : 
             view === 'forgot' ? t('auth.magicLinkTitle') : 
             t('auth.resetPasswordTitle')}
          </h2>
        </div>

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
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.login.email')}</label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="admin@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.login.password')}</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? t('common.processing') : t('admin.login.signIn')}
              {!isLoading && <LayoutDashboard className="ml-2 w-4 h-4" />}
            </button>

             <div className="flex items-center justify-between mt-6 text-sm">
               <Link to="/login" className="text-slate-400 hover:text-white transition-colors">&larr; {t('common.login')}</Link>
               <Link to="/admin/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">{t('admin.signup.register')}</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;