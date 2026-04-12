
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function MillionaireCalculator() {
  const [initialSavings, setInitialSavings] = useState(10000);
  const [annualContribution, setAnnualContribution] = useState(12000);
  const [interestRate, setInterestRate] = useState(8);
  const [yearsToMillion, setYearsToMillion] = useState(0);

  const calculate = () => {
    const target = 1000000;
    let years = 0;
    let balance = initialSavings;
    while (balance < target) {
      balance = balance * (1 + interestRate / 100) + annualContribution;
      years++;
    }
    setYearsToMillion(years);
  };

  return (
    <>
      <Helmet>
        <title>Millionaire Calculator</title>
        <meta name="description" content="Calculate how long it will take to become a millionaire." />
      </Helmet>
      <CalculatorWrapper
        title="Millionaire Calculator"
        description="Calculate how long it will take to reach a $1,000,000 net worth based on your current savings and investment plan."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Initial Savings
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={initialSavings}
                  onChange={(e) => setInitialSavings(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Contribution
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Interest Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Years to Become a Millionaire</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{yearsToMillion} years</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
