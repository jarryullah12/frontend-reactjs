import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../components/Logo';
import { supabase } from '@/lib/supabase';

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export function Login() {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { user } = session;
        
        try {
          // Check if user exists in our custom 'users' table
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single();
          
          if (existingUser) {
            login({ id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role, joinDate: existingUser.join_date });
            if (window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
            navigate('/');
          } else {
            // Create new user
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([{
                name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Google User',
                email: user.email,
                password: 'google-oauth-placeholder',
                role: 'user'
              }])
              .select()
              .single();
              
            if (newUser) {
              login({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, joinDate: newUser.join_date });
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
              }
              navigate('/');
            } else if (insertError) {
              console.error('Error creating user from Google login:', insertError);
              setError('Failed to create user account from Google login.');
            }
          }
        } catch (err) {
          console.error('Error handling Google login callback:', err);
        }
      }
    };
    
    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        checkSession();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [login, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login'
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to initialize Google login.');
    }
  };

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
        setError(fetchError?.message || 'User not found. Please check your credentials or sign up.');
        return;
      }

      login({ id: data.id, name: data.name, email: data.email, role: data.role, joinDate: data.join_date });
      navigate('/');
    } catch (err: any) {
      console.error('Supabase exception:', err);
      setError(err.message || 'An unexpected error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('login.back_home')}
        </Link>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center gap-2 mb-2">
              <Logo className="w-8 h-8" />
              <span className="text-3xl font-bold bg-gradient-to-r from-[#4f39f6] to-purple-600 bg-clip-text text-transparent">
                OptiSEO
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">{t('login.subtitle')}</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('login.email')}</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] transition-shadow" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('login.password')}</label>
                <Link to="/forgot-password" title={t('login.forgot')} className="text-sm font-medium text-[#4f39f6] dark:text-[#4f39f6] hover:text-[#4f39f6]/80">{t('login.forgot')}</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] transition-shadow" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-[#4f39f6] text-white rounded-xl font-medium hover:bg-[#4f39f6]/90 transition-colors shadow-sm">
              {t('login.submit')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-950 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <div>
              {t('login.no_account')}{' '}
              <Link to="/signup" className="font-medium text-[#4f39f6] dark:text-[#4f39f6] hover:text-[#4f39f6]/80">
                {t('login.signup')}
              </Link>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {/* <Link to="/admin/login" className="block text-[#4f39f6] hover:underline font-medium">
                Access Admin Panel
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
