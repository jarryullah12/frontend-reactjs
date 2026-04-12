
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

export function RuleOf72Calculator() {
  const [interestRate, setInterestRate] = useState('7');

  const yearsToDouble = useMemo(() => {
    const rate = parseFloat(interestRate);
    if (rate > 0) {
      return 72 / rate;
    }
    return 0;
  }, [interestRate]);

  return (
    <>
      <Helmet>
        <title>Rule of 72 Calculator</title>
        <meta name="description" content="Use the Rule of 72 to quickly estimate how long it will take for an investment to double in value at a fixed annual rate of interest." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto my-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Rule of 72 Calculator</h1>
        <p className="text-gray-600 mb-6">A quick mental shortcut to estimate an investment's doubling time.</p>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-xs">
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full text-center px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
              placeholder="e.g., 7"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6 w-full max-w-xs">
            <h2 className="text-xl font-bold text-gray-800">Years to Double Investment</h2>
            <p className="text-4xl font-extrabold text-brand-primary mt-2">≈ {yearsToDouble.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Years</p>
          </div>
        </div>

        <div className="mt-10 text-left text-gray-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding the Rule of 72</h2>
          <p className="mb-4">The Rule of 72 is a simple formula used in finance to quickly estimate the number of years required to double the value of an investment at a fixed annual rate of interest.</p>
          <div className="bg-gray-100 p-4 rounded-lg text-center font-mono text-lg">
              Years to Double = 72 / Annual Interest Rate
          </div>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>It provides a rough estimate, not an exact calculation.</li>
            <li>It is most accurate for interest rates between 6% and 10%.</li>
            <li>The rule does not account for taxes or fees.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

