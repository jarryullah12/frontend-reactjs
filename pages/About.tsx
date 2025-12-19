import React from 'react';
import { Users, Award, Globe, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Intro Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Intro */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('about.storyTitle')}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              {t('about.storyP1')}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              {t('about.storyP2')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">10k+</div>
                <div className="text-gray-600 font-medium">{t('about.stats.clients')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5M+</div>
                <div className="text-gray-600 font-medium">{t('about.stats.km')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-2">150+</div>
                <div className="text-gray-600 font-medium">{t('about.stats.vehicles')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-500 mb-2">99%</div>
                <div className="text-gray-600 font-medium">{t('about.stats.ontime')}</div>
              </div>
           </div>
        </div>

        {/* Fleet Info */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">{t('about.fleetTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
               <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-orange-600" />
               </div>
               <h3 className="text-xl font-bold mb-2">{t('about.fleetVans')}</h3>
               <p className="text-gray-600 text-sm">
                 {t('about.fleetVansDesc')}
               </p>
            </div>
            <div className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
               </div>
               <h3 className="text-xl font-bold mb-2">{t('about.fleetBox')}</h3>
               <p className="text-gray-600 text-sm">
                 {t('about.fleetBoxDesc')}
               </p>
            </div>
            <div className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-slate-900" />
               </div>
               <h3 className="text-xl font-bold mb-2">{t('about.fleetSemi')}</h3>
               <p className="text-gray-600 text-sm">
                 {t('about.fleetSemiDesc')}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;