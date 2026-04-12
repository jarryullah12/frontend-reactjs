
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function EarlyRetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [annualSavings, setAnnualSavings] = useState(20000);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [retirementSavings, setRetirementSavings] = useState(0);

  const calculate = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const futureValue = annualSavings * ((Math.pow(1 + investmentReturn / 100, yearsToRetirement) - 1) / (investmentReturn / 100));
    setRetirementSavings(futureValue);
  };

  return (
    <>
      <Helmet>
        <title>Early Retirement Calculator</title>
        <meta name="description" content="Estimate the savings needed for early retirement." />
      </Helmet>
      <CalculatorWrapper
        title="Early Retirement Calculator"
        description="Estimate the savings you need to accumulate to retire early, based on your desired retirement age and lifestyle."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Current Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Desired Retirement Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Savings
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={annualSavings}
                  onChange={(e) => setAnnualSavings(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Investment Return (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={investmentReturn}
                  onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={calculate}
                className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark"
              >
                Calculate
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Estimated Retirement Savings</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{retirementSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
