import React from 'react';
import CalculatorWidget from '../components/CalculatorWidget';
import { useLanguage } from '../contexts/LanguageContext';

const Calculator: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
<<<<<<< HEAD
          <h1 className="text-3xl font-black text-slate-900 mb-4">{t('calculator.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">{t('calculator.subtitle')}</p>
=======
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('calculator.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
<<<<<<< HEAD
            <CalculatorWidget className="sticky top-24" />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-slate-900 mb-6">{t('calculator.howItWorks')}</h3>
              <ul className="space-y-6">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-black shrink-0">{num}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t(`calculator.${num === 1 ? 'baseFee' : num === 2 ? 'distRate' : 'vehicleClass'}`)}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{t(`calculator.${num === 1 ? 'baseFeeDesc' : num === 2 ? 'distRateDesc' : 'vehicleClassDesc'}`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;