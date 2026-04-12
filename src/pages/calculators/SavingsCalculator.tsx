<<<<<<< HEAD

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
=======
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(100000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(6);
  const [years, setYears] = useState(10);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [yearlyData, setYearlyData] = useState<{ year: number; balance: number; interest: number }[]>([]);

  useEffect(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = years * 12;

    let balance = initialDeposit;
    let totalInt = 0;
    const dataByYear: { year: number; balance: number; interest: number }[] = [];

    for (let m = 1; m <= months; m++) {
      const interestThisMonth = balance * monthlyRate;
      totalInt += interestThisMonth;
      balance += interestThisMonth + monthlyDeposit;

      if (m % 12 === 0) {
        dataByYear.push({
          year: m / 12,
          balance: Math.round(balance),
          interest: Math.round(totalInt),
        });
      }
    }

    const deposited = initialDeposit + monthlyDeposit * months;
    setTotalDeposited(Math.round(deposited));
    setTotalInterest(Math.round(totalInt));
    setMaturityAmount(Math.round(balance));
    setYearlyData(dataByYear);
  }, [initialDeposit, monthlyDeposit, interestRate, years]);

  const pieData = [
    { name: 'Total Deposited', value: totalDeposited },
    { name: 'Interest Earned', value: totalInterest },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Savings Interest Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Initial Deposit', fmt(initialDeposit)],
        ['Monthly Deposit', fmt(monthlyDeposit)],
        ['Annual Interest Rate (%)', interestRate],
        ['Time Period (Years)', years],
        ['Maturity Amount', fmt(maturityAmount)],
        ['Total Deposited', fmt(totalDeposited)],
        ['Interest Earned', fmt(totalInterest)],
      ],
    });
    doc.save('savings-report.pdf');
  };
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

  return (
    <>
      <Helmet>
<<<<<<< HEAD
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
=======
        <title>Savings Interest Calculator - See Your Money Grow | FinovaCalc</title>
        <meta name="description" content="Calculate the future value of your savings with FinovaCalc's free savings calculator. See how regular deposits and compound interest can help you reach your financial goals." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/savings" />
        <meta name="keywords" content="savings calculator, compound interest calculator, savings goal calculator, investment calculator, future value calculator, financial planning" />
        <meta property="og:title" content="Savings Interest Calculator - See Your Money Grow | FinovaCalc" />
        <meta property="og:description" content="Calculate the future value of your savings with FinovaCalc's free savings calculator. See how regular deposits and compound interest can help you reach your financial goals." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/savings" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Savings Interest Calculator - See Your Money Grow | FinovaCalc" />
        <meta name="twitter:description" content="Calculate the future value of your savings with FinovaCalc's free savings calculator. See how regular deposits and compound interest can help you reach your financial goals." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Savings Interest Calculator"
        description="Calculate how much your savings will grow over time with regular deposits and compound interest."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Initial Deposit: {fmt(initialDeposit)}
              </label>
              <input
                type="range"
                min="0"
                max="5000000"
                step="10000"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Deposit: {fmt(monthlyDeposit)}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="500"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Interest Rate (%): {interestRate}
              </label>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Time Period (Years): {years}
              </label>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-4">
              <h3 className="text-lg font-medium text-gray-500">Maturity Amount</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(maturityAmount)}</p>
            </div>

            <div className="w-full space-y-4 mb-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Deposited</span>
                <span className="font-semibold">{fmt(totalDeposited)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Interest Earned</span>
                <span className="font-semibold text-green-600">{fmt(totalInterest)}</span>
              </div>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => fmt(Number(value))} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
             <div className="mt-6">
              <button 
                onClick={handleDownload}
                className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

      {/* Growth Chart */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-inner border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Savings Growth Over Time</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => fmt(Number(value))} />
              <Legend />
              <Bar dataKey="balance" name="Total Balance" fill="#0B3C5D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="interest" name="Cumulative Interest" fill="#D9B310" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">About Savings Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A savings calculator helps you project the growth of your savings over time.</li>
          <li>Enter your initial deposit, monthly contributions, interest rate, and investment period.</li>
          <li>The calculator shows the total amount you will have at the end of the term.</li>
          <li>It provides a breakdown of your total deposits and the total interest earned.</li>
          <li>The bar chart visualizes the year-on-year growth of your savings and interest.</li>
          <li>This tool is excellent for planning and setting goals for your financial objectives.</li>
          <li>See how small, regular contributions can grow into a significant amount over time.</li>
          <li>A great way to understand the power of compounding on your savings.</li>
          <li>Our savings calculator is free, intuitive, and helps you make informed financial plans.</li>
          <li>Start planning for your future goals, whether it's a down payment, vacation, or retirement.</li>
        </ul>
      </div>
    </CalculatorWrapper>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    </>
  );
}
