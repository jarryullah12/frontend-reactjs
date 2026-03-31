import React, { useState } from 'react';
import { useAuthStore } from '@/store';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

export function AdminLogin() {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Fetch user from Supabase
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (fetchError || !data) {
        console.error('Error fetching user:', fetchError);
        
        // Hardcoded admin fallback
        if (email === 'jarryullah46@gmail.com' && password === '@Qwerty123') {
          login({ id: 'admin-jarry', name: 'Jarry Ullah', email, isAdminSession: true, role: 'admin' });
          navigate('/admin');
          return;
        }
        
        setError(fetchError?.message || 'Invalid admin credentials. This login is for administrators only.');
        return;
      }

      if (data.role === 'admin') {
        login({ id: data.id, name: data.name, email: data.email, isAdminSession: true, role: 'admin' });
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. This login is for administrators only.');
      }
    } catch (err: any) {
      console.error('Supabase exception:', err);
      
      // Hardcoded admin fallback
      if (email === 'jarryullah46@gmail.com' && password === '@Qwerty123') {
        login({ id: 'admin-jarry', name: 'Jarry Ullah', email, isAdminSession: true, role: 'admin' });
        navigate('/admin');
        return;
      }
      
      setError(err.message || 'An unexpected error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to User Login
        </Link>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <ShieldCheck className="w-8 h-8 text-[#4f39f6] opacity-20" />
          </div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#4f39f6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-[#4f39f6]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
            <p className="text-gray-500 dark:text-gray-400">Secure access for administrators</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Admin Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] transition-shadow" 
                placeholder="admin@optiseo.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Secret Key</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] transition-shadow" 
                placeholder="••••••••" 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-[#4f39f6] text-white rounded-xl font-bold hover:bg-[#4f39f6]/90 transition-colors shadow-lg shadow-[#4f39f6]/20">
              Verify & Enter
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-400">
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
