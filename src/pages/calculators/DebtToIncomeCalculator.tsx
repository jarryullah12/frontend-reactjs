
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

export function DebtToIncomeCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [monthlyDebt, setMonthlyDebt] = useState('1500');

  const dtiRatio = useMemo(() => {
    const income = parseFloat(monthlyIncome);
    const debt = parseFloat(monthlyDebt);
    if (income > 0) {
      return (debt / income) * 100;
    }
    return 0;
  }, [monthlyIncome, monthlyDebt]);

  const dtiStatus = useMemo(() => {
    if (dtiRatio <= 35) return { text: 'Healthy', color: 'text-green-600' };
    if (dtiRatio <= 43) return { text: 'Manageable', color: 'text-yellow-600' };
    if (dtiRatio <= 50) return { text: 'Concerning', color: 'text-orange-600' };
    return { text: 'High Risk', color: 'text-red-600' };
  }, [dtiRatio]);

  const chartData = useMemo(() => [
    { name: 'Income after Debt', value: parseFloat(monthlyIncome) - parseFloat(monthlyDebt) },
    { name: 'Debt', value: parseFloat(monthlyDebt) },
  ], [monthlyIncome, monthlyDebt]);

  return (
    <>
      <Helmet>
        <title>Debt-to-Income (DTI) Ratio Calculator</title>
        <meta name="description" content="Calculate your debt-to-income (DTI) ratio to assess your financial health and borrowing capacity. Understand how lenders view your debt load." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Debt-to-Income (DTI) Ratio Calculator</h1>
        <p className="text-gray-600 mb-6">Assess your financial health by calculating your DTI ratio, a key metric used by lenders.</p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">Gross Monthly Income ($)</label>
              <input
                type="number"
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                placeholder="e.g., 5000"
              />
            </div>
            <div>
              <label htmlFor="monthlyDebt" className="block text-sm font-medium text-gray-700 mb-1">Total Monthly Debt Payments ($)</label>
              <input
                type="number"
                id="monthlyDebt"
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                placeholder="e.g., 1500"
              />
               <p className="text-xs text-gray-500 mt-1">Includes rent/mortgage, loans, credit cards, alimony, etc.</p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your DTI Ratio</h2>
            <p className="text-4xl font-extrabold text-brand-primary">{dtiRatio.toFixed(2)}%</p>
            <p className={`mt-2 font-semibold ${dtiStatus.color}`}>{dtiStatus.text}</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={2}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend iconType="circle"/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Your DTI Ratio</h2>
          <div className="space-y-4 text-gray-600">
            <p>Your debt-to-income (DTI) ratio is your total monthly debt divided by your gross monthly income, expressed as a percentage. It is a key indicator of your financial health.</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>35% or less:</strong> Healthy. You likely have a good balance of debt and income.</li>
              <li><strong>36% to 43%:</strong> Manageable. This is a common range, but you should aim to lower your DTI. Lenders may offer loans, but with potentially higher interest rates.</li>
              <li><strong>44% to 50%:</strong> Concerning. You may have limited borrowing options and should focus on reducing debt.</li>
              <li><strong>Over 50%:</strong> High Risk. It is unlikely you will be approved for new credit.</li>
            </ul>
            <p>Lenders use DTI to assess your ability to manage monthly payments and repay debts. A lower DTI ratio shows that you have enough income to service your current obligations, making you a lower-risk borrower.</p>
          </div>
        </div>
      </div>
    </>
  );
}
