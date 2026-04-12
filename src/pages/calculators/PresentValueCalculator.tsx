
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [presentValue, setPresentValue] = useState(0);

  const calculate = () => {
    setPresentValue(futureValue / Math.pow(1 + interestRate / 100, years));
  };

  return (
    <>
      <Helmet>
        <title>Present Value Calculator</title>
        <meta name="description" content="Calculate the present value of a future sum of money." />
      </Helmet>
      <CalculatorWrapper
        title="Present Value Calculator"
        description="Calculate the present value of a future sum of money, allowing you to understand its worth today."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Future Value
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={futureValue}
                  onChange={(e) => setFutureValue(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Discount Rate (%)
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
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Number of Years
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Present Value</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{presentValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
