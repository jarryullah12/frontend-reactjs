
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function PensionCalculator() {
  const [lastSalary, setLastSalary] = useState(60000);
  const [yearsOfService, setYearsOfService] = useState(25);
  const [pensionFactor, setPensionFactor] = useState(2);
  const [annualPension, setAnnualPension] = useState(0);

  const calculate = () => {
    setAnnualPension(lastSalary * (yearsOfService / 100) * pensionFactor);
  };

  return (
    <>
      <Helmet>
        <title>Pension Calculator</title>
        <meta name="description" content="Estimate your future pension payments." />
      </Helmet>
      <CalculatorWrapper
        title="Pension Calculator"
        description="Estimate your potential annual pension based on your salary, years of service, and pension plan factor."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Last Annual Salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={lastSalary}
                  onChange={(e) => setLastSalary(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Years of Service
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Pension Factor (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={pensionFactor}
                  onChange={(e) => setPensionFactor(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Estimated Annual Pension</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{annualPension.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
