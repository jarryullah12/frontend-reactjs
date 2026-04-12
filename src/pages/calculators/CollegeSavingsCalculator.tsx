
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function CollegeSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [annualCost, setAnnualCost] = useState('20000');
  const [currentSavings, setCurrentSavings] = useState('10000');
  const [annualReturn, setAnnualReturn] = useState(7);

  const { totalCost, monthlyContribution } = useMemo(() => {
    const yearsToCollege = collegeAge - currentAge;
    if (yearsToCollege <= 0) return { totalCost: 0, monthlyContribution: 0 };

    const futureCost = parseFloat(annualCost) * 4; // Simple 4-year estimate
    const rate = annualReturn / 100;

    // Future value of current savings
    const fvCurrentSavings = parseFloat(currentSavings) * Math.pow(1 + rate, yearsToCollege);

    const shortfall = futureCost - fvCurrentSavings;
    if (shortfall <= 0) return { totalCost: futureCost, monthlyContribution: 0 };

    // Monthly contribution calculation
    const monthlyRate = rate / 12;
    const totalMonths = yearsToCollege * 12;
    const fvFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    const monthly = shortfall / fvFactor;

    return { totalCost: futureCost, monthlyContribution: monthly };
  }, [currentAge, collegeAge, annualCost, currentSavings, annualReturn]);

  const chartData = useMemo(() => {
    const data = [];
    const yearsToCollege = collegeAge - currentAge;
    if (yearsToCollege <= 0) return [];

    const rate = annualReturn / 100;
    const monthlyRate = rate / 12;
    let savings = parseFloat(currentSavings);

    for (let year = 0; year <= yearsToCollege; year++) {
      data.push({ year: currentAge + year, savings: savings.toFixed(2) });
      for (let month = 0; month < 12; month++) {
        savings += monthlyContribution;
        savings *= (1 + monthlyRate);
      }
    }
    return data;
  }, [currentAge, collegeAge, currentSavings, annualReturn, monthlyContribution]);

  return (
    <>
      <Helmet>
        <title>College Savings Calculator</title>
        <meta name="description" content="Plan for your child's future education costs. Estimate the total cost of college and determine the monthly savings needed to reach your goal." />
      </Helmet>
      <CalculatorWrapper
        title="College Savings Calculator"
        description="Estimate future education costs and how much you need to save."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Child's Current Age: {currentAge}</label>
                <input type="range" min="0" max="17" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Age at College Enrollment: {collegeAge}</label>
                <input type="range" min={currentAge + 1} max="25" value={collegeAge} onChange={(e) => setCollegeAge(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Current Annual College Cost ($)</label>
                <input type="number" value={annualCost} onChange={(e) => setAnnualCost(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Current College Savings ($)</label>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%): {annualReturn}%</label>
                <input type="range" min="0" max="15" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">Estimated Total 4-Year Cost</h2>
              <p className="text-3xl font-extrabold text-brand-primary">${totalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
            <div className="text-center mt-6">
              <h2 className="text-xl font-bold text-gray-800">Required Monthly Contribution</h2>
              <p className="text-3xl font-extrabold text-brand-secondary">${monthlyContribution.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
             <p className="text-xs text-gray-500 mt-4 text-center">To reach your goal by the time your child is {collegeAge}.</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Projected Savings Growth</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: "Child's Age", position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Savings ($)', angle: -90, position: 'insideLeft' }} tickFormatter={(tick) => `$${(tick/1000)}k`} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Projected Savings" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About This Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A college savings calculator is a tool designed to help parents and students plan for the costs of higher education.</li>
            <li>By inputting variables such as the child's current age, the age they will start college, current annual college costs, existing savings, and expected investment returns, the calculator can project the future cost of college.</li>
            <li>It also estimates the monthly contribution needed to meet the savings goal.</li>
            <li>The calculator provides a visual representation of the savings growth over time through a line chart, which shows the projected increase in savings year by year.</li>
            <li>This tool is essential for long-term financial planning, allowing families to start saving early and take advantage of compound interest.</li>
            <li>Users can adjust the inputs to see how different scenarios—such as higher investment returns or starting to save earlier—can impact the required monthly savings.</li>
            <li>The projected savings growth chart helps to visualize the long-term benefits of consistent saving and investment.</li>
            <li>This calculator simplifies a complex financial planning process into a few easy steps, making it accessible to everyone.</li>
            <li>It's a crucial first step for anyone looking to fund a college education without relying heavily on student loans.</li>
            <li>By providing a clear savings target, the calculator empowers users to make informed decisions and stay on track with their financial goals.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
