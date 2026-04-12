
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function SocialSecurityCalculator() {
  const [birthYear, setBirthYear] = useState(1990);
  const [averageSalary, setAverageSalary] = useState(60000);
  const [benefitAmount, setBenefitAmount] = useState(0);

  const calculate = () => {
    // Dummy calculation
    setBenefitAmount(averageSalary * 0.4);
  };

  return (
    <>
      <Helmet>
        <title>Social Security Calculator</title>
        <meta name="description" content="Estimate your Social Security benefits." />
      </Helmet>
      <CalculatorWrapper
        title="Social Security Calculator"
        description="Estimate your potential Social Security benefits based on your earnings history and retirement age."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Birth Year
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Average Annual Salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={averageSalary}
                  onChange={(e) => setAverageSalary(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Estimated Monthly Benefit</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{benefitAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
