import React from 'react';
import { Truck, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // Hide Footer on admin routes, login and signup
  if (location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/navbar-logo-1767021061006.png?width=8000&height=8000&resize=contain" 
                  alt="Spedition Askari" 
                  className="h-24 w-auto" 
                />
              </div>
              <p className="text-sm leading-relaxed mb-4 text-white max-w-sm">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <div className="text-gray-400 hover:text-blue-500 transition-colors cursor-default">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="text-gray-400 hover:text-blue-500 transition-colors cursor-default">
                  <Instagram className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('nav.services')}</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/services" className="text-white hover:text-blue-500 transition-colors">{t('services.express.title')}</Link></li>
                <li><Link to="/services" className="text-white hover:text-blue-500 transition-colors">{t('services.extra.title')}</Link></li>
                <li><Link to="/services" className="text-white hover:text-blue-500 transition-colors">{t('services.lkw.title')}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('footer.company')}</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/about" className="text-white hover:text-blue-500 transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/about" className="text-white hover:text-blue-500 transition-colors">{t('nav.fleet')}</Link></li>
                <li><Link to="/contact" className="text-white hover:text-blue-500 transition-colors">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('common.contactUs')}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-white">Südbahnstraße 31,<br />32584 Löhne</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-white">+49 5731 1530960</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-white">Info@spedition-askari.de</span>
                </li>
              </ul>
            </div>

        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-white">
          <p className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <span>&copy; {new Date().getFullYear()} {t('common.brandName')}. {t('footer.allRightsReserved')}</span>
            <span className="hidden md:inline text-white">|</span>
            <Link to="/legal-notice" className="hover:text-blue-500 transition-colors">{t('footer.legalNotice')}</Link>
            <span className="hidden md:inline text-white">|</span>
            <Link to="/disclaimer" className="hover:text-blue-500 transition-colors">{t('footer.disclaimer')}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;