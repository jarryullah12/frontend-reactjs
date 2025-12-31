import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
<<<<<<< HEAD
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header - Updated to Blue */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
=======
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">{t('contact.title')}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Location */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
<<<<<<< HEAD
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-6">
=======
            <div className="bg-orange-100 p-4 rounded-full text-orange-600 mb-6">
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
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