import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, User, Globe, ChevronDown, LogIn, UserPlus, LogOut, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logoutClient } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth.client);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const NAV_ITEMS = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/services' },
    ...(isAuthenticated ? [{ label: t('nav.orders'), path: '/orders' }] : []),
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const handleLogout = () => {
    dispatch(logoutClient());
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-wide">Spedition Askari</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-orange-500'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-slate-700 mx-2"></div>

              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-gray-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {/* Account Dropdown */}
              <div className="relative ml-2" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none ${
                    isProfileOpen || isActive('/profile')
                      ? 'bg-slate-800 text-white' 
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>{isAuthenticated && user ? user.name.split(' ')[0] : t('nav.account')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 ring-1 ring-black ring-opacity-5 origin-top-right transform transition-all animate-fadeIn">
                      {isAuthenticated && user ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          
                          <div className="py-1">
                             <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <User className="w-4 h-4 text-gray-400" /> {t('nav.profile')}
                             </Link>
                          </div>
                          
                          <div className="border-t border-gray-100 mt-1 pt-1">
                             <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <LogOut className="w-4 h-4" /> {t('common.logout')}
                             </button>
                          </div>
                        </>
                      ) : (
                        <div className="py-1">
                          <Link to="/login" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <LogIn className="w-4 h-4 text-gray-400" /> {t('common.login')}
                          </Link>
                          <Link to="/signup" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <UserPlus className="w-4 h-4 text-gray-400" /> {t('common.signup')}
                          </Link>
                        </div>
                      )}
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleLanguage} className="text-gray-300 text-xs font-bold px-2 py-1 border border-slate-700 rounded uppercase">
               {language}
             </button>
             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 py-4 px-4 space-y-1 animate-fadeIn">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                isActive(item.path) ? 'bg-slate-800 text-orange-500' : 'text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="border-t border-slate-800 pt-4 mt-4 space-y-1">
            {isAuthenticated ? (
               <>
                 <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-300 font-medium">
                   {t('nav.profile')}
                 </Link>
                 <button onClick={handleLogout} className="block w-full text-left px-3 py-3 text-red-400 font-medium">
                   {t('common.logout')}
                 </button>
               </>
            ) : (
               <>
                 <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-300 font-medium">{t('common.login')}</Link>
                 <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-orange-500 font-bold">{t('common.signup')}</Link>
               </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;