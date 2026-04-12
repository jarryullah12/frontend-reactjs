
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

// 2024 IRS Uniform Lifetime Table for RMD Calculations
const rmdDistributionPeriods = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.2,
    80: 20.4, 81: 19.6, 82: 18.8, 83: 18.0, 84: 17.2, 85: 16.5, 86: 15.8, 87: 15.1,
    88: 14.4, 89: 13.7, 90: 13.1, 91: 12.5, 92: 11.9, 93: 11.3, 94: 10.8, 95: 10.3,
    96: 9.8, 97: 9.3, 98: 8.9, 99: 8.5, 100: 8.1, 101: 7.7, 102: 7.3, 103: 7.0,
    104: 6.7, 105: 6.4, 106: 6.1, 107: 5.8, 108: 5.5, 109: 5.2, 110: 5.0, 111: 4.8,
    112: 4.6, 113: 4.4, 114: 4.2, 115: 4.0, 116: 3.8, 117: 3.6, 118: 3.5, 119: 3.3, 120: 3.1
};

export function RequiredMinimumDistributionCalculator() {
  const [accountBalance, setAccountBalance] = useState('500000');
  const [age, setAge] = useState(75);

  const rmdAmount = useMemo(() => {
    if (age < 72) return 0;
    const distributionPeriod = rmdDistributionPeriods[age] || 27.4; // Default for 72
    const balance = parseFloat(accountBalance);
    if (balance > 0) {
      return balance / distributionPeriod;
    }
    return 0;
  }, [accountBalance, age]);

  return (
    <>
      <Helmet>
        <title>Required Minimum Distribution (RMD) Calculator</title>
        <meta name="description" content="Calculate your Required Minimum Distribution (RMD) from your retirement accounts like a 401(k) or traditional IRA." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">RMD Calculator</h1>
        <p className="text-gray-600 mb-6">Estimate your IRS-mandated Required Minimum Distribution (RMD) from your retirement accounts.</p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Retirement Account Balance (as of Dec 31 last year)</label>
              <input type="number" value={accountBalance} onChange={e => setAccountBalance(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Age at End of This Year: {age}</label>
               <input type="range" min="72" max="120" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800">Estimated RMD</h2>
            <p className="text-4xl font-extrabold text-brand-primary">${rmdAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p className="mt-2 text-gray-600">To be withdrawn this year.</p>
          </div>
        </div>

        <div className="mt-10 text-gray-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About RMDs</h2>
          <p className="mb-4">The IRS requires you to withdraw a minimum amount—an RMD—from most retirement accounts (like Traditional IRAs, 401(k)s, and 403(b)s) annually, starting at age 73 (or 72, depending on your birth year).</p>
          <ul className="list-disc list-inside space-y-2">
            <li>This calculator uses the IRS Uniform Lifetime Table to estimate your RMD.</li>
            <li>The calculation is based on your account balance at the end of the previous year and your age at the end of the current year.</li>
            <li>Failing to take your full RMD can result in a significant tax penalty.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500"><strong>Disclaimer:</strong> This is an informational estimate. Consult a financial advisor or tax professional regarding your specific RMD requirements.</p>
        </div>
      </div>
    </>
  );
}
