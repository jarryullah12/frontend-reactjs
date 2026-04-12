
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function MutualFundFeeCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [expenseRatio, setExpenseRatio] = useState('1.5');
  const [investmentYears, setInvestmentYears] = useState(20);

  const { futureValueWithoutFees, futureValueWithFees, totalFees } = useMemo(() => {
    const P = parseFloat(initialInvestment);
    const r = parseFloat(annualReturn) / 100;
    const fee = parseFloat(expenseRatio) / 100;
    const t = investmentYears;

    const valWithoutFees = P * Math.pow(1 + r, t);
    const valWithFees = P * Math.pow(1 + r - fee, t);
    const feesPaid = valWithoutFees - valWithFees;

    return {
        futureValueWithoutFees: valWithoutFees,
        futureValueWithFees: valWithFees,
        totalFees: feesPaid,
    };
  }, [initialInvestment, annualReturn, expenseRatio, investmentYears]);

  const chartData = useMemo(() => {
      const data = [];
      const P = parseFloat(initialInvestment);
      const r = parseFloat(annualReturn) / 100;
      const fee = parseFloat(expenseRatio) / 100;

      for (let i = 0; i <= investmentYears; i++) {
          data.push({
              year: i,
              withFees: P * Math.pow(1 + r - fee, i),
              withoutFees: P * Math.pow(1 + r, i),
          });
      }
      return data;
  }, [initialInvestment, annualReturn, expenseRatio, investmentYears]);

  return (
    <>
      <Helmet>
        <title>Mutual Fund Fee Calculator</title>
        <meta name="description" content="See how mutual fund expense ratios and fees can impact your investment returns over time. Understand the long-term cost of your investments." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mutual Fund Fee Calculator</h1>
        <p className="text-gray-600 mb-6">Understand the long-term impact of fees on your investment growth.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Investment ($)</label>
              <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Return Before Fees (%)</label>
              <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Expense Ratio (%)</label>
              <input type="number" step="0.01" value={expenseRatio} onChange={e => setExpenseRatio(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Investment Horizon (Years): {investmentYears}</label>
              <input type="range" min="1" max="50" value={investmentYears} onChange={e => setInvestmentYears(Number(e.target.value))} className="w-full"/>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-red-600">Total Fees Paid</h2>
                <p className="text-4xl font-extrabold text-red-500">${totalFees.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                      <span>Future Value (with fees)</span>
                      <span className="font-semibold">${futureValueWithFees.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between">
                      <span>Future Value (no fees)</span>
                      <span className="font-semibold">${futureValueWithoutFees.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                  </div>
              </div>
          </div>
        </div>

         <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Impact of Fees Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft' }} tickFormatter={(tick) => `$${(tick/1000)}k`} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="withoutFees" stroke="#22c55e" strokeWidth={2} name="Without Fees" dot={false}/>
              <Line type="monotone" dataKey="withFees" stroke="#ef4444" strokeWidth={2} name="With Fees" dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
