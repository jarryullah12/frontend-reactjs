import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldAlert, Copy, Check } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginAdmin } from '../../store/slices/authSlice';
import { supabase, SQL_SETUP_SNIPPET } from '../../services/supabase';
<<<<<<< HEAD
import { useLanguage } from '../../contexts/LanguageContext';
=======
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

const AdminSignup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
<<<<<<< HEAD
  const { t } = useLanguage();
=======
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  
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
<<<<<<< HEAD
    if (!formData.name.trim()) newErrors.name = t('admin.signup.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('admin.signup.emailRequired');
    if (!formData.password) newErrors.password = t('admin.signup.passwordRequired');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('admin.signup.passwordsDoNotMatch');
=======
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Trim inputs for validation check
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();

    if (!cleanName) newErrors.name = 'Full Name is required';

    if (!cleanEmail) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Invalid email address format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
=======
  const copyToClipboard = () => {
    navigator.clipboard.writeText(SQL_SETUP_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSql(false);

    if (!validateForm()) return;

    setIsLoading(true);

    // Prepare clean data for submission
    const cleanEmail = formData.email.trim();
    const cleanName = formData.name.trim();

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
<<<<<<< HEAD
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
=======
        // 2. Create Profile in 'profiles' table with ADMIN role
        const profilePayload = {
          id: authData.user.id,
          email: cleanEmail,
          full_name: cleanName,
          role: 'admin', // Critical: Set role to admin
          password: formData.password, // Store for manual fallback login
          join_date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profilePayload]);

        if (profileError) {
             console.error("Admin Profile creation failed:", JSON.stringify(profileError, null, 2));
             
             // Check for specific error codes
             if (profileError.code === '42501') {
                 setShowSql(true);
                 throw new Error("Database permission denied. Run the SQL below to fix.");
             }
             if (profileError.code === 'PGRST204') {
                 setShowSql(true);
                 throw new Error("Database schema outdated. Run the SQL below to fix.");
             }
             if (profileError.code === '23505') {
                 throw new Error("An account with this email already exists.");
             }
             
             throw new Error(`Profile creation failed: ${profileError.message}`);
        }

        // 3. Login or Redirect
        if (authData.session) {
          dispatch(loginAdmin({
            name: cleanName,
            email: cleanEmail,
            role: 'admin',
            joinDate: new Date().toLocaleDateString()
          }));
          navigate('/admin/dashboard');
        } else {
          // If email confirmation is required by Supabase but we want to allow login anyway,
          // redirect to login page where the fallback logic handles it.
          navigate('/admin/login');
        }
      }
    } catch (err: any) {
      console.error('Admin Signup error:', err);
      if (err.message && (err.message.includes('security purposes') || err.message.includes('seconds'))) {
        setError('Too many attempts. Please wait 30 seconds.');
      } else if (err.message === 'Failed to fetch') {
        setError('Connection failed. Check internet.');
      } else if (err.message && err.message.includes('invalid')) {
        setError(`Invalid email: ${err.message}`);
      } else {
        setError(err.message || 'Failed to create admin account.');
      }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
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
=======
      <div className={`w-full bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all ${showSql ? 'max-w-2xl' : 'max-w-md'}`}>
        <div className="text-center">
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Admin Registration</h2>
          <p className="mt-2 text-sm text-slate-400">
            Create a new staff account.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              <p className="font-bold">{error}</p>
              
              {showSql && (
                <div className="mt-4">
                   <p className="text-xs text-slate-400 mb-2">
                     Copy the code below and run it in the Supabase SQL Editor to fix this error.
                   </p>
                   <div className="relative">
                      <div className="absolute top-2 right-2">
                        <button 
                          type="button"
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 bg-slate-700 text-white px-2 py-1 rounded text-xs hover:bg-slate-600 border border-slate-600"
                        >
                          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-slate-950 text-gray-300 p-3 rounded-lg text-xs overflow-x-auto h-40 font-mono text-left border border-slate-700">
                        {SQL_SETUP_SNIPPET}
                      </pre>
                   </div>
                   <div className="mt-2 text-xs text-orange-500">
                      Supabase Dashboard &rarr; SQL Editor &rarr; New Query &rarr; Paste &rarr; Run
                   </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-slate-700'}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin Name"
              />
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="text"
                name="email"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@company.com"
              />
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-slate-700'}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 bg-slate-900 border placeholder-slate-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70 mt-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/admin/login" className="font-bold text-orange-500 hover:text-orange-400">
            Back to Admin Login
          </Link>
        </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      </div>
    </div>
  );
};

export default AdminSignup;