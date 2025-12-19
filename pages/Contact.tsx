import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">{t('contact.title')}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Location */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 p-4 rounded-full text-orange-600 mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.ourLocation')}</h3>
            <p className="text-gray-600">Südbahnstraße 31,<br />32584 Löhne</p>
          </div>

          {/* Phone */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('common.phone')}</h3>
            <p className="text-gray-600 text-lg font-medium">+49 5731 1530960</p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('common.email')}</h3>
            <p className="text-gray-600">Info@spedition-askari.de</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;