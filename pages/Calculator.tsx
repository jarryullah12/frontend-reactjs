import React from 'react';
import CalculatorWidget from '../components/CalculatorWidget';
import { useLanguage } from '../contexts/LanguageContext';

const Calculator: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 mb-4">{t('calculator.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">{t('calculator.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
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


          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;