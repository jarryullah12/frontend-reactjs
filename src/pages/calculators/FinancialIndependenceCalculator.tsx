
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function FinancialIndependenceCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(50000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [targetSavings, setTargetSavings] = useState(0);

  const calculate = () => {
    setTargetSavings(annualExpenses / (withdrawalRate / 100));
  };

  return (
    <>
      <Helmet>
        <title>Financial Independence Calculator</title>
        <meta name="description" content="Determine the savings needed to achieve financial independence." />
      </Helmet>
      <CalculatorWrapper
        title="Financial Independence Calculator"
        description="Determine the amount of savings you need to achieve financial independence and live off your investments."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Expenses
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Safe Withdrawal Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Target Savings for Financial Independence</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{targetSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
