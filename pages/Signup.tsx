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
    const phoneRegex = /^\+?[\d\s-]{7,}$/;

    // Trim inputs for validation check
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();

    if (!cleanName) newErrors.name = t('common.name') + ' is required';
    
    if (!cleanEmail) {
      newErrors.email = t('common.email') + ' is required';
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Invalid email address';
    }

    if (!cleanPhone) {
      newErrors.phone = t('common.phone') + ' is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!cleanAddress) newErrors.address = t('common.address') + ' is required';

    if (!formData.password) {
      newErrors.password = t('common.password') + ' is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

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
    
    // Prepare clean data for submission - Force Lowercase Email
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create Profile in 'profiles' table
        const profilePayload = {
          id: authData.user.id,
          email: cleanEmail,
          full_name: cleanName,
          phone: cleanPhone,
          address: cleanAddress,
          role: 'client',
          password: formData.password, // Added as per request to bypass email confirm check
          join_date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profilePayload]);

        if (profileError) {
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
          // If auto-confirm is disabled, just redirect to login
          // The login page handles unconfirmed emails via manual DB check
          navigate('/login');
        }
      }
    } catch (err: any) {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`w-full bg-white p-8 rounded-2xl shadow-xl transition-all ${showSql ? 'max-w-2xl' : 'max-w-md'}`}>
        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{t('auth.createAccount')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.joinDesc')}
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              <p className="font-bold">{error}</p>
              
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
                          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-slate-900 text-gray-300 p-3 rounded-lg text-xs overflow-x-auto h-40 font-mono text-left">
                        {SQL_SETUP_SNIPPET}
                      </pre>
                   </div>
                   <div className="mt-2 text-xs text-blue-600">
                      Supabase Dashboard &rarr; SQL Editor &rarr; New Query &rarr; Paste &rarr; Run
                   </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.name')}
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.email')}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70 mt-6"
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