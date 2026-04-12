
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function RetirementSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');

  const retirementBalance = useMemo(() => {
    const yearsToRetirement = parseInt(retirementAge) - parseInt(currentAge);
    if (yearsToRetirement <= 0) return parseFloat(currentSavings);

    const rate = parseFloat(annualReturn) / 100;
    const monthlyRate = rate / 12;
    const months = yearsToRetirement * 12;

    // FV of current savings
    const fvCurrent = parseFloat(currentSavings) * Math.pow(1 + rate, yearsToRetirement);

    // FV of monthly contributions
    const fvContributions = parseFloat(monthlyContribution) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    return fvCurrent + fvContributions;
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn]);

  return (
    <>
      <Helmet>
        <title>Retirement Savings Calculator</title>
        <meta name="description" content="Plan for your retirement with our savings calculator. Estimate how much you need to save to reach your retirement goals." />
      </Helmet>
      <CalculatorWrapper
        title="Retirement Savings Calculator"
        description="Estimate your savings growth and see if you're on track for retirement."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Age</label>
              <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Planned Retirement Age</label>
              <input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Retirement Savings ($)</label>
              <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
             <h2 className="text-2xl font-bold text-gray-800">Estimated Retirement Balance</h2>
            <p className="text-5xl font-extrabold text-brand-primary my-4">${retirementBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
             <p className="text-md text-gray-600">At age {retirementAge}</p>
          </div>
        </div>
         <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About the Retirement Savings Calculator</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>A retirement savings calculator is a powerful tool to help you plan for your financial future.</li>
                <li>It estimates the total value of your retirement savings based on your current age, planned retirement age, current savings, monthly contributions, and expected annual return.</li>
                <li>By entering these details, you can get a projection of your retirement nest egg.</li>
                <li>This allows you to see if you are on track to meet your retirement goals or if you need to adjust your savings plan.</li>
                <li>The power of compound interest is a key factor in this calculation, as your investment returns begin to generate their own returns over time.</li>
                <li>You can experiment with different scenarios, such as increasing your monthly contribution or adjusting your expected rate of return, to see how it impacts your final balance.</li>
                <li>This calculator is designed to give you a clear and understandable estimate, but it's important to remember that it is a projection and not a guarantee.</li>
                <li>Actual investment returns can vary, and it's always a good idea to consult with a financial advisor for personalized retirement planning.</li>
                <li>Starting to save early and contributing regularly are two of the most effective strategies for building a substantial retirement fund.</li>
                <li>Use this calculator as a starting point to take control of your retirement planning and work towards a secure financial future.</li>
            </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
