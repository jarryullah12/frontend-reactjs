import React, { useState, useEffect } from 'react';
import disposableDomains from 'disposable-email-domains/index.json';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Builder from './pages/Builder';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';
import Templates from './pages/Templates';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import Docs from './pages/Docs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import ForgotPassword from './pages/ForgotPassword';
import CookiePolicy from './pages/CookiePolicy';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Admin from './pages/Admin';
import DebugAuth from './pages/DebugAuth';
import { User } from './types';
import { clearLocalAuthStorage, getAuthenticatedUser, getSupabase } from './services/supabase';
import { normalizeEmail } from './utils/email';
import { resolveUserRole } from './utils/auth';
import { Sparkles, ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Auth options


export const Logo: React.FC<{ size?: string }> = ({ size = "w-8 h-8" }) => (
  <div className={`${size} relative flex items-center justify-center group`}>
    {/* Background Shape */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-200/50 rotate-3 group-hover:rotate-6 transition-transform"></div>
    {/* The Geometric 'P' */}
    <svg className="relative w-1/2 h-1/2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="4" height="16" rx="1" fill="currentColor"/>
      <path d="M8 4H14C17.3137 4 20 6.68629 20 10C20 13.3137 17.3137 16 14 16H8V4Z" fill="currentColor"/>
      <path d="M8 8H14C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12H8V8Z" fill="white" fillOpacity="0.2"/>
    </svg>
  </div>
);

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return document.documentElement.classList.contains('dark');
  });
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
      {isDark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      )}
    </button>
  );
};

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isBuilder = location.pathname.startsWith('/builder');
  const isPayment = location.pathname.startsWith('/payment');
  const isAuth = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';

  if (isBuilder || isPayment || isAuth) return null;

  const NavLinks = () => (
    <>
      <Link 
        to="/templates" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        Templates
      </Link>
      <Link 
        to="/pricing" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        Pricing
      </Link>
      <Link 
        to="/blog" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        Blog
      </Link>
      <Link 
        to="/about" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        About
      </Link>
      <Link 
        to="/docs" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        Docs
      </Link>
      <Link 
        to="/contact" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2 text-sm font-bold transition"
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center text-slate-900 dark:text-white">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo />
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Pro<span className="text-blue-600 dark:text-blue-500">Resume</span>Lab
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm font-black uppercase tracking-widest px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg">Admin</Link>
                  )}
                  <Link to="/settings" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-bold">Settings</Link>
                  <button 
                    onClick={onLogout}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-bold">Login</Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition shadow-xl shadow-blue-200">
                    Get Started
                  </Link>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <NavLinks />
              <div className="pt-4 border-t dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-blue-600 dark:text-blue-500 text-sm font-black uppercase tracking-widest px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/settings" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-slate-900 dark:text-white text-sm font-bold px-3 py-2"
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl text-sm font-bold text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-slate-900 dark:text-white text-sm font-bold px-3 py-3 text-center border dark:border-slate-800 rounded-xl"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-black text-center shadow-lg shadow-blue-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FreeTrialBanner: React.FC<{ showBanner: boolean }> = ({ showBanner }) => {
  const location = useLocation();
  const isAuth = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';
  const isBuilder = location.pathname.startsWith('/builder');
  const isPayment = location.pathname.startsWith('/payment');

  if (!showBanner || isAuth || isBuilder || isPayment) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center text-sm font-bold shadow-md relative z-10 w-full animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="container mx-auto flex items-center justify-center gap-2 pr-6 relative">
        <Sparkles size={16} className="text-yellow-300" />
        <span>Satisfied or refunded within 7 Days - If Dissetisfied, Please Contact Us</span>
        <button 
          onClick={() => window.dispatchEvent(new Event('hideFreeTrialBanner'))}
          className="absolute right-0 text-white hover:text-slate-200 transition"
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [dbConnectionError, setDbConnectionError] = useState<string | null>(null);
  const [accountDisabledMessage, setAccountDisabledMessage] = useState<string | null>(null);
  const [authCallbackError, setAuthCallbackError] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(localStorage.getItem('hideFreeTrial') !== 'true');

  console.log('[App] State:', { userEmail: user?.email, loading, authCallbackError });

  const buildUserData = async (authUser: any) => {
    const supabase = getSupabase();
    console.log('[Auth] Building user data for:', authUser.email);
    try {
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authUser.id)
        .single();

      const isNotFound = profileErr?.code === 'PGRST116';
      if (profileErr && !isNotFound) {
        console.error('[Auth] Error fetching profile role:', profileErr);
      }

      const resolvedRole = resolveUserRole(profile?.role, authUser.email);

      if (isNotFound) {
        console.log('[Auth] Profile not found, creating...');
        await supabase.from('profiles').upsert({
          id: authUser.id,
          email: normalizeEmail(authUser.email || ''),
          role: resolvedRole,
        }, { onConflict: 'id' });
      } else if (resolvedRole === 'admin' && profile?.role !== 'admin') {
        console.log('[Auth] Updating user to admin...');
        await supabase.from('profiles').update({ role: 'admin' }).eq('id', authUser.id);
      }

      return {
        id: authUser.id,
        email: normalizeEmail(authUser.email || ''),
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
        role: resolvedRole
      };
    } catch (err) {
      console.error('[Auth] buildUserData unexpected error:', err);
      throw err;
    }
  };

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[Unhandled Rejection]', event.reason);
    };
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    let isMounted = true;

    // Listen for custom event to hide banner immediately across components
    const handleHideBanner = () => {
      setShowBanner(false);
      localStorage.setItem('hideFreeTrial', 'true');
    };
    window.addEventListener('hideFreeTrialBanner', handleHideBanner);

    const supabase = getSupabase();

    // 1. Subscribe to auth changes FIRST to catch any events triggered by subsequent calls
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] State Change:', event, session?.user?.email);
      
      if (session?.user) {
        try {
          const userData = await buildUserData(session.user);
          console.log('[Auth] User data built successfully:', userData.email);
          if (isMounted) {
            setUser(userData);
            setDbConnectionError(null);
            setAuthCallbackError(null);
          }
          localStorage.setItem('user', JSON.stringify(userData));

          void (async () => {
            try {
              const verifiedUser = await getAuthenticatedUser(0, 0, 6000);
              if (!verifiedUser) {
                clearUserState();
              }
            } catch {
            }
          })();
        } catch (err) {
          console.error('[Auth] Error building user data:', err);
          const userDataFallback = {
            id: session.user.id,
            email: normalizeEmail(session.user.email || ''),
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            role: 'user' as const
          };
          if (isMounted) setUser(userDataFallback);
          localStorage.setItem('user', JSON.stringify(userDataFallback));
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('[Auth] Event SIGNED_OUT: Clearing state');
        clearUserState();
      } else if (event === 'INITIAL_SESSION' && !session) {
        console.log('[Auth] Event INITIAL_SESSION (null): No existing session found');
        // If we're not currently in the middle of a code exchange, clear the stale user state
        if (!window.location.search.includes('code=')) {
          console.log('[Auth] No OAuth code in URL, clearing potentially stale local user state');
          clearUserState();
        }
      }

      window.clearTimeout(authBootstrapTimer);
      stopLoading();
    });

    const stopLoading = () => {
      if (!isMounted) return;
      setLoading(false);
    };
    const clearUserState = () => {
      localStorage.removeItem('user');
      if (isMounted) {
        setUser(null);
      }
    };

    const handleAuthCallback = async () => {
      const url = new URL(window.location.href);
      const fromSearch = url.searchParams;
      const fromHash = new URLSearchParams((url.hash || '').replace(/^#/, '?'));
      const code = fromSearch.get('code') || fromHash.get('code');
      const errorDescription =
        fromSearch.get('error_description') ||
        fromSearch.get('error') ||
        fromHash.get('error_description') ||
        fromHash.get('error');

      if (errorDescription) {
        console.error('[Auth] OAuth Error in URL:', errorDescription);
        try {
          if (isMounted) setAuthCallbackError(decodeURIComponent(errorDescription));
        } catch {
          if (isMounted) setAuthCallbackError(errorDescription);
        }
      }

      if (!code) return;

      console.log('[Auth] OAuth Code detected, exchanging for session...');
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (error.message.includes('already been used')) {
            console.log('[Auth] Code already used, likely handled by auto-detect.');
          } else {
            throw error;
          }
        }
        console.log('[Auth] Code exchange successful');
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          window.location.replace('/settings');
        }
      } catch (err: any) {
        console.error('[Auth] Code exchange failed:', err.message);
        if (isMounted) setAuthCallbackError(`Login failed: ${err.message}`);
      } finally {
        // Cleanup URL
        fromSearch.delete('code');
        fromSearch.delete('state');
        fromSearch.delete('error');
        fromSearch.delete('error_description');
        const cleanUrl = url.pathname + (fromSearch.toString() ? `?${fromSearch.toString()}` : '');
        window.history.replaceState(null, '', cleanUrl);
      }
    };

    const checkInitialSession = async () => {
      // Check if localStorage is working
      try {
        localStorage.setItem('test', '1');
        localStorage.removeItem('test');
        
        // Cleanup old potentially corrupt keys from previous versions
        const oldKeys = ['proresumelab-auth-token', 'supabase.auth.token'];
        oldKeys.forEach(k => {
          if (localStorage.getItem(k)) {
            console.log('[Auth] Removing stale storage key:', k);
            localStorage.removeItem(k);
          }
        });
      } catch (e) {
        console.error('[Auth] LocalStorage BLOCKED!', e);
        setAuthCallbackError('Browser storage is blocked. Please enable cookies and site data.');
        return;
      }

      // If we have a code, handleAuthCallback will take care of it
      if (window.location.search.includes('code=') || window.location.hash.includes('code=')) {
        console.log('[Auth] Skipping initial getSession because code is present');
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('[Auth] Initial getSession result:', !!session, error?.message);
        if (session?.user) {
          const userData = await buildUserData(session.user);
          if (isMounted) setUser(userData);

          void (async () => {
            try {
              const verifiedUser = await getAuthenticatedUser(0, 0, 6000);
              if (!verifiedUser) {
                clearUserState();
              }
            } catch {
            }
          })();
        }
      } catch (err) {
        console.error('[Auth] getSession check failed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    // Kick off initialization
    void handleAuthCallback().then(() => {
      void checkInitialSession();
    });

    const authBootstrapTimer = window.setTimeout(() => {
      if (isMounted) stopLoading();
    }, 10000);

    return () => {
      isMounted = false;
      window.clearTimeout(authBootstrapTimer);
      subscription.unsubscribe();
      window.removeEventListener('hideFreeTrialBanner', handleHideBanner);
    };
  }, []);

  const handleLogout = async () => {
    console.log('[Auth] Logging out...');
    const supabase = getSupabase();
    try {
      (supabase.auth as any).stopAutoRefresh?.();
    } catch {
    }

    clearLocalAuthStorage();
    setUser(null);
    window.location.replace('/');

    void (async () => {
      try {
        await Promise.race([
          (supabase.auth as any).signOut?.({ scope: 'global' }) ?? supabase.auth.signOut(),
          new Promise((resolve) => window.setTimeout(resolve, 1500))
        ]);
      } catch {
      }
    })();
  };

  const requireAuth = (element: React.ReactNode) => {
    if (loading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return user ? element : <Navigate to="/login" />;
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <FreeTrialBanner showBanner={showBanner} />
          <Navbar user={user} onLogout={handleLogout} />
          {accountDisabledMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-4 text-center text-sm font-bold text-red-700 dark:text-red-400">
              <p>{accountDisabledMessage}</p>
            </div>
          )}
          {authCallbackError && (
            <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-3 text-center text-xs font-bold text-red-700 dark:text-red-400">
              <p>{authCallbackError}</p>
            </div>
          )}
          {dbConnectionError && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 p-2 text-center text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {dbConnectionError}. Some features may be unavailable. 
              <button onClick={() => window.location.reload()} className="underline ml-2 hover:text-amber-800 dark:hover:text-amber-300">Retry</button>
            </div>
          )}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={requireAuth(<Settings user={user} />)} />
              <Route path="/builder" element={requireAuth(<Builder />)} />
              <Route path="/builder/:id" element={requireAuth(<Builder />)} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/admin" element={loading ? requireAuth(<Admin user={user} />) : <Admin user={user} />} />
              <Route path="/debug-auth" element={<DebugAuth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/login" element={<AuthForm buildUserData={buildUserData} onLogin={(u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); }} />} />
              <Route path="/signup" element={<AuthForm buildUserData={buildUserData} isSignup onLogin={(u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); }} />} />
            </Routes>
          </main>
          <CookieConsent />
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const hideFooter = ['/builder', '/payment', '/login', '/signup', '/forgot-password'].some(path => 
    location.pathname.startsWith(path)
  );

  if (hideFooter) return null;

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <Logo size="w-8 h-8" />
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Pro<span className="text-blue-600 dark:text-blue-500">Resume</span>Lab
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-sm leading-relaxed mb-8">
              Create job-winning resumes in minutes with our advanced AI. Trusted by professionals worldwide to land their dream jobs.
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/jarryullah002/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-pink-600 dark:hover:text-pink-500 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@jarryullah22?lang=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-black dark:hover:text-white transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.43-3.67-5.71-.24-2.5.76-5.06 2.65-6.68 1.76-1.54 4.19-2.12 6.47-1.54V12.1c-1.3-.39-2.73-.24-3.9.43-1.02.58-1.78 1.56-2.02 2.72-.25 1.1.1 2.29.83 3.12.89 1.05 2.37 1.49 3.73 1.24 1.46-.26 2.62-1.35 3.01-2.77.08-.28.1-.56.1-.85V.02z"/></svg>
              </a>
              {/* Pinterest */}
              <a 
                href="https://www.pinterest.com/jarryullah002/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.195 0 7.464 2.99 7.464 6.98 0 4.168-2.626 7.525-6.273 7.525-1.225 0-2.376-.637-2.768-1.385l-.752 2.87c-.272 1.042-1.01 2.342-1.503 3.136 1.458.441 3.003.655 4.567.655 6.621 0 11.988-5.368 11.988-11.988C24 5.367 18.638 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-6">Product</h4>
            <div className="flex flex-col gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <Link to="/templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resume Templates</Link>
              <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</Link>
              <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-6">Resources</h4>
            <div className="flex flex-col gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Career Blog</Link>
              <Link to="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Documentation</Link>
              <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</Link>
              <Link to="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Disclaimer</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Bhotto Calony<br/>Sargodha Road<br/>Faisalabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+923356471303" className="hover:text-blue-600 dark:hover:text-blue-400 transition">+92 335 6471303</a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:support@proresumelab.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition break-all">support@proresumelab.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">© {new Date().getFullYear()} ProResumeLab AI. Crafted for excellence.</p>
        </div>
      </div>
    </footer>
  );
};

const AuthForm: React.FC<{ 
  isSignup?: boolean; 
  onLogin: (u: User) => void;
  buildUserData: (authUser: any) => Promise<User>;
}> = ({ isSignup, onLogin, buildUserData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fromSearch = new URLSearchParams(location.search);
    const fromHash = new URLSearchParams((location.hash || '').replace(/^#/, '?'));
    const errorDescription =
      fromSearch.get('error_description') ||
      fromSearch.get('error') ||
      fromHash.get('error_description') ||
      fromHash.get('error');
    if (errorDescription) {
      try {
        setIsError(decodeURIComponent(errorDescription));
      } catch {
        setIsError(errorDescription);
      }
    }
  }, [location.search, location.hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[AuthForm] handleSubmit triggered. isSignup:', isSignup, 'Email:', email);
    setIsError('');
    setIsLoading(true);
    const supabase = getSupabase();
    const rawEmail = email.trim();
    const normalizedEmail = normalizeEmail(rawEmail);
    console.log('Auth Form: Email:', rawEmail, 'Normalized:', normalizedEmail);
    try {
      if (isSignup) {
        const domain = normalizedEmail.split('@')[1]?.toLowerCase();
        if (domain && disposableDomains.includes(domain)) {
          throw new Error('Disposable email addresses are not allowed. Please use a regular email address.');
        }
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: {
              data: {
                full_name: name,
              }
            }
          });
          if (error) throw error;
          
          if (data.user) {
              // Fetch role after signup (trigger handles creation)
              const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();
  
              // Sync email and plain_password on signup
              try {
                await supabase
                  .from('profiles')
                  .update({ email: normalizedEmail, plain_password: password })
                  .eq('id', data.user.id);
              } catch (e) {
                console.warn("Could not sync profile on signup.", e);
              }

              const resolvedRole = resolveUserRole(profile?.role, data.user.email || normalizedEmail);
              if (resolvedRole === 'admin' && profile?.role !== 'admin') {
                await supabase.from('profiles').update({ role: 'admin' }).eq('id', data.user.id);
              }

              onLogin({ 
                id: data.user.id, 
                email: normalizeEmail(data.user.email || normalizedEmail), 
                name: name || 'User',
                role: resolvedRole
              });
              navigate('/settings');
            }
        } catch (supabaseError: any) {
             throw supabaseError;
        }
        } else {
          try {
            console.log('Auth Form: Starting login attempt');
            const loginCandidates = Array.from(new Set([rawEmail.toLowerCase(), normalizedEmail]));
            console.log('Auth Form: Login candidates:', loginCandidates);
            let data: any = null;
            let error: any = null;

            for (const candidateEmail of loginCandidates) {
              console.log('[AuthForm] Attempting login with:', candidateEmail);
              const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: candidateEmail,
                password,
              });
              
              data = loginData;
              error = loginError;

              if (!error && data?.user) {
                console.log('[AuthForm] Login successful for:', candidateEmail);
                break;
              }
              console.warn(`[AuthForm] Login failed for ${candidateEmail}:`, error?.message);
            }

            if (error || !data?.user) {
              throw error || new Error('Invalid login credentials');
            }

            if (data.user) {
              console.log('[AuthForm] Processing user session...');
              
              // We should have a session if verification is disabled/completed
              if (!data.session) {
                console.warn('[AuthForm] User logged in but no session found. This might be due to unconfirmed email.');
                // Even if the user said verification is removed, Supabase might still require it if not configured correctly.
                throw new Error('Email verification pending or session could not be established.');
              }

              // Build user data
              const userData = await buildUserData(data.user);
              
              // Update local state and storage immediately
              onLogin(userData);
              
              console.log('[AuthForm] Navigating to settings...');
              navigate('/settings');
            }
          } catch (supabaseError: any) {
             throw supabaseError;
          }
        }
    } catch (err: any) {
      const rawMessage = err?.message || 'An error occurred';
      setIsError(rawMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Removed popup listener

  const handleGoogleLogin = async () => {
    setIsError('');
    setIsLoading(true);
    const supabase = getSupabase();
    const redirectTo = window.location.origin + '/auth/callback';
    console.log('[Auth] Starting Google OAuth, redirectTo:', redirectTo);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        }
      });
      console.log('[Auth] signInWithOAuth result — error:', error, 'url:', data?.url);
      if (error) throw error;
      
      if (data?.url) {
        console.log('[Auth] Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('Google OAuth URL missing');
      }
    } catch (err: any) {
      const rawMessage = err?.message || '';
      console.error('[Auth] Google login error:', rawMessage);
      if (rawMessage.toLowerCase().includes('redirect') || rawMessage.toLowerCase().includes('not allowed')) {
        setIsError(
          `Google login redirect blocked.\n` +
          `1) Google Cloud Console (OAuth) → Authorized redirect URIs mein ye add karein: https://sdbwfxhxdruwhomelvdz.supabase.co/auth/v1/callback\n` +
          `2) Supabase Dashboard → Auth → URL Configuration → Additional Redirect URLs mein ye add karein: ${redirectTo}`
        );
      } else {
        setIsError(rawMessage || 'Failed to authenticate with Google');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800">
      <div className="flex justify-center mb-6">
        <Logo size="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-black mb-2 text-center text-slate-900 dark:text-white">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8 font-medium">Build your future with ProResumeLab AI.</p>
      
      {isError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-800">
          {isError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-600/20 outline-none transition" 
              placeholder="Your Name" 
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-600/20 outline-none transition" 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <div className="mb-1 ml-1">
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password</label>
          </div>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-600/20 outline-none transition" 
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100 dark:shadow-none mt-4 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            isSignup ? 'Create My Account' : 'Sign In'
          )}
        </button>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="mt-4 w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <Link to={isSignup ? '/login' : '/signup'} className="text-blue-600 dark:text-blue-500 font-bold ml-1 hover:underline">
            {isSignup ? 'Log in' : 'Sign up for free'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default App;

const AuthCallback: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Signing you in...</p>
      </div>
    </div>
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-1 uppercase text-xs tracking-widest">Cookie Policy</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-4">
            We use cookies to improve your experience. By continuing to visit this site you agree to our 
            <Link to="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">cookie policy</Link>.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={acceptCookies}
              className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition shadow-lg dark:shadow-none"
            >
              Accept All
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-slate-400 dark:text-slate-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
