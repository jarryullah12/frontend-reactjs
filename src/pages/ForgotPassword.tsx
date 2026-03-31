import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Key, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

export function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [recoveredPassword, setRecoveredPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecoveredPassword(null);
    setError(false);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('password')
        .eq('email', email)
        .single();

      if (fetchError || !data) {
        setError(true);
      } else {
        setRecoveredPassword(data.password);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('forgot_password.back_login')}
        </Link>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4f39f6]/10 text-[#4f39f6] mb-4">
              <Key className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('forgot_password.title')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('forgot_password.subtitle')}</p>
          </div>
          
          <form onSubmit={handleRecover} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('forgot_password.email_label')}</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] transition-shadow" 
                placeholder="you@example.com" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#4f39f6] text-white rounded-xl font-medium hover:bg-[#4f39f6]/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Processing...' : t('forgot_password.button')}
            </button>
          </form>

          {recoveredPassword && (
            <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
                {t('forgot_password.success_msg')}
              </p>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  readOnly 
                  value={recoveredPassword}
                  className="w-full px-4 py-2 bg-white dark:bg-black border border-emerald-200 dark:border-emerald-800 rounded-lg text-gray-900 dark:text-white font-mono"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {error && (
             <p className="mt-4 text-center text-sm text-red-500">
               {t('forgot_password.error_msg')}
             </p>
          )}
        </div>
      </div>
    </div>
  );
}
