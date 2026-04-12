
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function SavingsCalculator() {
  const [initialSavings, setInitialSavings] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(5);

  const { futureValue, chartData } = useMemo(() => {
    const rate = parseFloat(interestRate) / 100;
    const monthlyRate = rate / 12;
    let fv = parseFloat(initialSavings);
    const data = [{ year: 0, savings: fv }];

    for (let i = 1; i <= years; i++) {
      for (let j = 0; j < 12; j++) {
        fv = fv * (1 + monthlyRate) + parseFloat(monthlyContribution);
      }
      data.push({ year: i, savings: fv });
    }

    return { futureValue: fv, chartData: data };

  }, [initialSavings, monthlyContribution, years, interestRate]);

  return (
    <>
      <Helmet>
        <title>Savings Calculator</title>
        <meta name="description" content="Calculate the future value of your savings and see how your money can grow over time with our savings calculator." />
      </Helmet>
      <CalculatorWrapper
        title="Savings Calculator"
        description="See how your savings can grow over time with consistent contributions and interest."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Savings ($)</label>
              <input type="number" value={initialSavings} onChange={e => setInitialSavings(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Years: {years}</label>
              <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%): {interestRate}%</label>
              <input type="range" min="0" max="20" step="0.5" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-gray-800">Future Value of Savings</h2>
            <p className="text-5xl font-extrabold text-brand-primary my-4">${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="text-md text-gray-600">After {years} years</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Projected Savings Growth</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Savings ($)', angle: -90, position: 'insideLeft'}} tickFormatter={(tick) => `$${(tick/1000)}k`} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#8884d8" strokeWidth={2} name="Projected Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
         <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About the Savings Calculator</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>A savings calculator is a tool that helps you project the growth of your savings over time.</li>
                <li>It takes into account your initial savings, regular monthly contributions, the number of years you plan to save, and the expected annual interest rate.</li>
                <li>The calculator shows you the future value of your savings, demonstrating the impact of compound interest.</li>
                <li>Compound interest means you earn interest not only on your initial savings and contributions but also on the accumulated interest.</li>
                <li>This tool is excellent for setting financial goals, such as saving for a down payment on a house, a new car, or a vacation.</li>
                <li>The line chart provides a visual representation of your savings growth year by year, making it easy to see your progress.</li>
                <li>By adjusting the inputs, you can see how different scenarios, like increasing your monthly contribution or finding a better interest rate, can affect your savings outcome.</li>
                <li>This calculator is designed to be a simple and effective way to plan for your financial future.</li>
                <li>It empowers you to make informed decisions and stay motivated to reach your savings targets.</li>
                <li>Start planning today and watch your savings grow with the power of consistent contributions and compound interest.</li>
            </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
