import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldAlert, Copy, Check } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginAdmin } from '../../store/slices/authSlice';
import { supabase, SQL_SETUP_SNIPPET } from '../../services/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminSignup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('admin.signup.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('admin.signup.emailRequired');
    if (!formData.password) newErrors.password = t('admin.signup.passwordRequired');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('admin.signup.passwordsDoNotMatch');
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
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: authData.user.id,
          email: formData.email,
          full_name: formData.name,
          role: 'admin',
          password: formData.password,
          join_date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        }]);

        if (profileError) throw profileError;
        navigate('/admin/login');
      }
    } catch (err: any) {
      setError(err.message || t('admin.signup.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center">
          <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <ShieldAlert className="w-8 h-8 text-blue-500" />
          </div>
<h2 className="text-3xl font-extrabold text-white">{t('admin.signup.title')}</h2>
            <p className="mt-2 text-slate-400">{t('admin.signup.subtitle')}</p>
          </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.signup.fullName')}</label>
            <input type="text" name="name" className="w-full px-3 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-blue-500" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.signup.email')}</label>
            <input type="text" name="email" className="w-full px-3 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-blue-500" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.signup.password')}</label>
            <input type="password" name="password" className="w-full px-3 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-blue-500" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{t('admin.signup.confirmPassword')}</label>
            <input type="password" name="confirmPassword" className="w-full px-3 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-blue-500" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 mt-4">
            {isLoading ? t('common.processing') : t('admin.signup.register')}
          </button>
        </form>
        <div className="text-center mt-6"><Link to="/admin/login" className="text-blue-500 font-medium">{t('admin.signup.loginLink')}</Link></div>
      </div>
    </div>
  );
};

export default AdminSignup;