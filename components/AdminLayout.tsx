import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Truck, 
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logoutAdmin } from '../store/slices/authSlice';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector(state => state.auth.admin);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t('admin.dashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { label: t('admin.orders'), path: '/admin/orders', icon: Package },
    { label: t('admin.customers'), path: '/admin/customers', icon: Users },
    { label: t('admin.settings'), path: '/admin/settings', icon: Settings },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Truck className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0" />
          <span className="font-bold text-base tracking-wide leading-tight">Spedition Askari Admin Panel</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-slate-800 text-orange-500'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t('common.logout')}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <div className="flex items-center gap-4">
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2 py-2 text-sm font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'Admin'}</p>
             </div>
             <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;