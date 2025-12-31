import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Truck, ArrowRight, Phone, MapPin, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppDispatch } from '../store/hooks';
import { loginClient } from '../store/slices/authSlice';
import { supabase, SQL_SETUP_SNIPPET } from '../services/supabase';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
<<<<<<< HEAD

=======
    const phoneRegex = /^\+?[\d\s-]{7,}$/;

    // Trim inputs for validation check
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();

    if (!cleanName) newErrors.name = t('common.name') + ' is required';
<<<<<<< HEAD
=======
    
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    if (!cleanEmail) {
      newErrors.email = t('common.email') + ' is required';
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Invalid email address';
    }
<<<<<<< HEAD
    if (!cleanPhone) newErrors.phone = t('common.phone') + ' is required';
    if (!cleanAddress) newErrors.address = t('common.address') + ' is required';
=======

    if (!cleanPhone) {
      newErrors.phone = t('common.phone') + ' is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!cleanAddress) newErrors.address = t('common.address') + ' is required';

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    if (!formData.password) {
      newErrors.password = t('common.password') + ' is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
<<<<<<< HEAD
=======

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

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
<<<<<<< HEAD
=======
    
    // Prepare clean data for submission - Force Lowercase Email
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();

    try {
<<<<<<< HEAD
=======
      // 1. Sign up with Supabase Auth
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
<<<<<<< HEAD
=======
        // 2. Create Profile in 'profiles' table
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        const profilePayload = {
          id: authData.user.id,
          email: cleanEmail,
          full_name: cleanName,
          phone: cleanPhone,
          address: cleanAddress,
          role: 'client',
<<<<<<< HEAD
          password: formData.password,
=======
          password: formData.password, // Added as per request to bypass email confirm check
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          join_date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profilePayload]);

        if (profileError) {
<<<<<<< HEAD
             if (profileError.code === '42501' || profileError.code === 'PGRST204') {
                 setShowSql(true);
                 throw new Error("Database configuration required. Please run the SQL below.");
             }
             if (profileError.code === '23505') {
                 throw new Error("An account with this email already exists.");
             }
             throw new Error(`Profile creation failed: ${profileError.message}`);
        }

=======
             console.error("Profile creation failed details:", JSON.stringify(profileError, null, 2));
             
             // Check for specific error codes
             if (profileError.code === '42501') {
                 // RLS Violation
                 setShowSql(true);
                 throw new Error("Database permission denied. Run the SQL below in Supabase to fix.");
             }
             if (profileError.code === 'PGRST204') {
                 // Missing column
                 setShowSql(true);
                 throw new Error("Database schema outdated. Run the SQL below to fix.");
             }
             if (profileError.code === '23505') {
                 // Duplicate key
                 throw new Error("An account with this email already exists.");
             }
             
             throw new Error(`Profile creation failed: ${profileError.message}`);
        }

        // 3. Login or Redirect
        // If auto-confirm is enabled in Supabase, session will be present
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        if (authData.session) {
          dispatch(loginClient({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            address: cleanAddress,
            role: 'client',
            joinDate: new Date().toLocaleDateString()
          }));
          navigate('/');
        } else {
<<<<<<< HEAD
=======
          // If auto-confirm is disabled, just redirect to login
          // The login page handles unconfirmed emails via manual DB check
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          navigate('/login');
        }
      }
    } catch (err: any) {
<<<<<<< HEAD
      setError(err.message || 'Failed to create account. Please try again.');
=======
      console.error('Signup error:', err);
      if (err.message && (err.message.includes('security purposes') || err.message.includes('seconds'))) {
        setError('Too many attempts. Please wait 30 seconds before trying again.');
      } else if (err.message === 'Failed to fetch') {
        setError('Connection failed. Please check your internet or try again later.');
      } else if (err.message && err.message.includes('invalid')) {
        setError(`Invalid details: ${err.message}`);
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`w-full bg-white p-8 rounded-2xl shadow-xl transition-all ${showSql ? 'max-w-2xl' : 'max-w-md'}`}>
<<<<<<< HEAD
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-1767017985921.png?width=8000&height=8000&resize=contain" 
                alt="Spedition Askari" 
                className="h-32 w-auto"
              />
            </div>
=======
        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-orange-600" />
          </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          <h2 className="text-3xl font-extrabold text-slate-900">{t('auth.createAccount')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.joinDesc')}
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              <p className="font-bold">{error}</p>
<<<<<<< HEAD
              {showSql && (
                <div className="mt-4">
                   <p className="text-xs text-slate-600 mb-2">Copy code and run in Supabase SQL Editor.</p>
                   <div className="relative">
                      <div className="absolute top-2 right-2">
                        <button type="button" onClick={copyToClipboard} className="flex items-center gap-1 bg-slate-800 text-white px-2 py-1 rounded text-xs">
=======
              
              {showSql && (
                <div className="mt-4">
                   <p className="text-xs text-slate-600 mb-2">
                     Copy the code below and run it in the Supabase SQL Editor to fix this error.
                   </p>
                   <div className="relative">
                      <div className="absolute top-2 right-2">
                        <button 
                          type="button"
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 bg-slate-800 text-white px-2 py-1 rounded text-xs hover:bg-slate-700"
                        >
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-slate-900 text-gray-300 p-3 rounded-lg text-xs overflow-x-auto h-40 font-mono text-left">
                        {SQL_SETUP_SNIPPET}
                      </pre>
                   </div>
<<<<<<< HEAD
=======
                   <div className="mt-2 text-xs text-blue-600">
                      Supabase Dashboard &rarr; SQL Editor &rarr; New Query &rarr; Paste &rarr; Run
                   </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
<<<<<<< HEAD
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('common.name')}</label>
=======
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.name')}
              </label>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
<<<<<<< HEAD
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
=======
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
<<<<<<< HEAD
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('common.email')}</label>
=======
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.email')}
              </label>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
<<<<<<< HEAD
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
=======
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
<<<<<<< HEAD
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.phone')}</label>
                <div className="relative">
                    <input
                        type="tel"
                        name="phone"
                        className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.address')}</label>
                <div className="relative">
                    <input
                        type="text"
                        name="address"
                        className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.password')}</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
=======
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.phone')}
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+49 123 45678"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.address')}
              </label>
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  type="text"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Street, City, Zip"
                  value={formData.address}
                  onChange={handleChange}
                />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
<<<<<<< HEAD
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.confirmPass')}</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
=======
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.confirmPass')}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
<<<<<<< HEAD
=======
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
<<<<<<< HEAD
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 mt-6"
=======
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70 mt-6"
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          >
            {isLoading ? t('common.processing') : t('common.signup')}
            {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t('auth.alreadyAccount')}{' '}
            <Link to="/login" className="font-bold text-slate-900 hover:text-slate-700">
              {t('common.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;