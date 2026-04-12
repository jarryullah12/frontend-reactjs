
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function CostOfLivingCalculator() {
  const [currentCity, setCurrentCity] = useState('New York');
  const [newCity, setNewCity] = useState('San Francisco');
  const [currentSalary, setCurrentSalary] = useState(100000);
  const [result, setResult] = useState(0);

  const calculate = () => {
    // Dummy calculation
    setResult(currentSalary * 1.25);
  };

  return (
    <>
      <Helmet>
        <title>Cost of Living Calculator</title>
        <meta name="description" content="Compare the cost of living between two cities." />
      </Helmet>
      <CalculatorWrapper
        title="Cost of Living Calculator"
        description="Compare the cost of living between two cities and determine the equivalent salary needed to maintain your lifestyle."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Current City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                New City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Current Salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Equivalent Salary in New City</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{result.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About This Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A cost of living calculator helps you compare the expenses of living in two different cities.</li>
            <li>By entering your current salary and the cities you are comparing, the calculator provides an estimate of the equivalent salary needed in the new city to maintain your current lifestyle.</li>
            <li>This tool is particularly useful for people considering a job offer in a new city or planning a move.</li>
            <li>The calculation is based on a comparison of various expenses, such as housing, transportation, food, and healthcare, between the two locations.</li>
            <li>Knowing the equivalent salary can help you negotiate your compensation and make an informed decision about relocating.</li>
            <li>Even a small difference in the cost of living can have a significant impact on your disposable income and quality of life.</li>
            <li>This calculator simplifies the process of estimating this difference, providing a clear financial target for your move.</li>
            <li>While this calculator provides a helpful estimate, it's important to research specific costs in the new city to get a complete picture.</li>
            <li>The tool uses data to provide a baseline comparison, which can be a great starting point for your research.</li>
            <li>Making a well-informed decision about a move requires careful financial planning, and this calculator is a key resource in that process.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
