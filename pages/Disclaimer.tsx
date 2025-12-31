import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Disclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('legal.disclaimerTitle')}</h1>
        
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.company')}</h2>
            <p className="text-slate-600">
              <strong>{t('legal.addressLabel')}</strong><br />
              Südbahnstraße 31<br />
              32584 Löhne<br />
              Deutschland
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('legal.liabilityContentTitle')}</h3>
            <p className="text-slate-600 mb-4">
              {t('legal.liabilityContentDesc')}
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('legal.liabilityLinksTitle')}</h3>
            <p className="text-slate-600 mb-4">
              {t('legal.liabilityLinksDesc')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.copyrightTitle')}</h2>
            <p className="text-slate-600">
              {t('legal.copyrightDesc')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
