import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LegalNotice: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('legal.title')}</h1>
        
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
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.representedBy')}</h2>
            <p className="text-slate-600">Tanveer Askari</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.contact')}</h2>
            <p className="text-slate-600">
              {t('legal.phone')} +49 (0) 5731 1530960<br />
              {t('legal.email')} info@spedition-askari.de<br />
              {t('legal.website')} www.spedition-askari.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.registry')}</h2>
            <p className="text-slate-600">
              {t('legal.registryDesc')}<br />
              {t('legal.court')}<br />
              {t('legal.registryNo')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.vatIdLabel')}</h2>
            <p className="text-slate-600">DE348127058</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('legal.responsible')}</h2>
            <p className="text-slate-600">
              Tanveer Askari<br />
              Südbahnstraße 31<br />
              32584 Löhne
            </p>
          </section>

          <hr className="border-slate-200" />

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.disclaimerTitle')}</h2>
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

export default LegalNotice;
