
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('3000');
  const [coverageMonths, setCoverageMonths] = useState(6);

  const targetFund = useMemo(() => {
    return parseFloat(monthlyExpenses) * coverageMonths;
  }, [monthlyExpenses, coverageMonths]);

  const chartData = useMemo(() => [
    { name: '3 Months', target: parseFloat(monthlyExpenses) * 3, label: 'Bare Minimum' },
    { name: '6 Months', target: parseFloat(monthlyExpenses) * 6, label: 'Recommended' },
    { name: '9 Months', target: parseFloat(monthlyExpenses) * 9, label: 'Conservative' },
  ], [monthlyExpenses]);

  return (
    <>
      <Helmet>
        <title>Emergency Fund Calculator</title>
        <meta name="description" content="Calculate the ideal size of your emergency fund to cover essential living expenses for 3-6 months. Plan your financial safety net." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Emergency Fund Calculator</h1>
        <p className="text-gray-600 mb-6">Build a financial safety net to handle unexpected life events.</p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700 mb-1">Total Monthly Living Expenses ($)</label>
              <input
                type="number"
                id="monthlyExpenses"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                placeholder="e.g., 3000"
              />
              <p className="text-xs text-gray-500 mt-1">Include rent/mortgage, utilities, food, transport, etc.</p>
            </div>
            <div>
              <label htmlFor="coverageMonths" className="block text-sm font-medium text-gray-700 mb-1">Months of Coverage ({coverageMonths} months)</label>
              <input
                type="range"
                id="coverageMonths"
                min="1"
                max="12"
                value={coverageMonths}
                onChange={(e) => setCoverageMonths(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your Emergency Fund Target</h2>
            <p className="text-4xl font-extrabold text-brand-primary">${targetFund.toLocaleString()}</p>
            <p className="mt-2 text-gray-600">To cover your expenses for {coverageMonths} months.</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Fund Goals</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Tooltip formatter={(value, name, props) => [`$${Number(value).toLocaleString()}`, props.payload.label]} />
                    <Legend />
                    <Bar dataKey="target" fill="#3b82f6" name="Fund Target" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* About Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why You Need an Emergency Fund</h2>
          <div className="space-y-4 text-gray-600">
            <p>An emergency fund is a stash of money set aside to cover large, unexpected expenses, such as:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Job loss or a sudden reduction in income</li>
              <li>Unexpected medical or dental emergencies</li>
              <li>Urgent car repairs or home maintenance</li>
              <li>Unplanned travel for family emergencies</li>
            </ul>
            <p>Financial experts generally recommend saving <strong>3 to 6 months' worth</strong> of essential living expenses. Your ideal fund size depends on your job stability, income, and risk tolerance.</p>
          </div>
        </div>
      </div>
    </>
  );
}
