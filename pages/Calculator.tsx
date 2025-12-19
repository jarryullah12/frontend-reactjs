import React from 'react';
import CalculatorWidget from '../components/CalculatorWidget';
import { useLanguage } from '../contexts/LanguageContext';

const Calculator: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('calculator.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
             <CalculatorWidget className="sticky top-24" />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
             <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('calculator.howItWorks')}</h3>
                <ul className="space-y-4">
                   <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-bold">{t('calculator.baseFee')}</h4>
                        <p className="text-gray-600 text-sm">{t('calculator.baseFeeDesc')}</p>
                      </div>
                   </li>
                   <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-bold">{t('calculator.distRate')}</h4>
                        <p className="text-gray-600 text-sm">{t('calculator.distRateDesc')}</p>
                      </div>
                   </li>
                   <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-bold">{t('calculator.vehicleClass')}</h4>
                        <p className="text-gray-600 text-sm">{t('calculator.vehicleClassDesc')}</p>
                      </div>
                   </li>
                </ul>
             </div>

             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-2">{t('calculator.customQuote')}</h3>
                <p className="text-orange-800 text-sm mb-4">
                  {t('calculator.customQuoteDesc')}
                </p>
                <a href="/contact" className="text-orange-600 font-bold hover:underline text-sm">{t('calculator.contactSales')} &rarr;</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;