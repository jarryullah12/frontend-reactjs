import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [totalCorpus, setTotalCorpus] = useState(0);

  useEffect(() => {
    const yearsToInvest = retirementAge - currentAge;
    const months = yearsToInvest * 12;
    const monthlyRate = expectedReturn / 12 / 100;

    let futureValueSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    let futureValueContributions = (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

    if (isNaN(futureValueSavings)) futureValueSavings = currentSavings;
    if (isNaN(futureValueContributions)) futureValueContributions = monthlyContribution * months;

    if (expectedReturn === 0) {
        futureValueSavings = currentSavings;
        futureValueContributions = monthlyContribution * months;
    }

    setTotalCorpus(Math.round(futureValueSavings + futureValueContributions));
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn]);

  const fmt = (v: number) => `$${v.toLocaleString()}`;
  
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Retirement Planning Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Current Age', currentAge],
        ['Retirement Age', retirementAge],
        ['Current Savings', fmt(currentSavings)],
        ['Monthly Contribution', fmt(monthlyContribution)],
        ['Expected Annual Return (%)', expectedReturn],
        ['Projected Retirement Corpus', fmt(totalCorpus)],
      ],
    });
    doc.save('retirement-planning-report.pdf');
  };

  return (
    <>
    <Helmet>
        <title>Retirement Planning Calculator - Plan Your Future | FinovaCalc</title>
        <meta name="description" content="Plan for your retirement with FinovaCalc's free retirement planning calculator. Estimate your future savings and ensure a comfortable post-retirement life." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/retirement" />
        <meta name="keywords" content="retirement calculator, retirement planning, savings calculator, investment planning, financial planning, retirement savings" />
        <meta property="og:title" content="Retirement Planning Calculator - Plan Your Future | FinovaCalc" />
        <meta property="og:description" content="Plan for your retirement with FinovaCalc's free retirement planning calculator. Estimate your future savings and ensure a comfortable post-retirement life." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/retirement" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Retirement Planning Calculator - Plan Your Future | FinovaCalc" />
        <meta name="twitter:description" content="Plan for your retirement with FinovaCalc's free retirement planning calculator. Estimate your future savings and ensure a comfortable post-retirement life." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
    <CalculatorWrapper
      title="Retirement Planning Calculator"
      description="Estimate how much you need to save for a comfortable retirement."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>
           <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Current Savings</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
             <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Monthly Contribution</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
             <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Expected Annual Return (%)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-center w-full mb-6">
            <h3 className="text-lg font-medium text-gray-500">Projected Retirement Corpus</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(totalCorpus)}</p>
          </div>
          <p className="text-sm text-gray-500 text-center">
            This is an estimate based on your inputs and a constant annual return. Inflation is not accounted for.
          </p>
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
      <div className="mt-8">
<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-4">About the Retirement Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A retirement calculator is a tool to help you estimate the future value of your retirement savings.</li>
          <li>You need to input your current age, planned retirement age, current savings, and your monthly contribution.</li>
          <li>You also need to provide an expected annual rate of return on your investments.</li>
          <li>The calculator will then project the total amount of money you will have saved by your retirement age.</li>
          <li>This tool is essential for understanding if you are on track to meet your retirement goals.</li>
          <li>By adjusting the inputs, you can see how different scenarios, such as increasing your monthly contribution, could impact your final corpus.</li>
          <li>It highlights the power of compounding and the importance of long-term, consistent investing.</li>
          <li>Keep in mind that this is an estimate and does not account for factors like inflation or changes in investment returns.</li>
          <li>It is a great starting point for anyone looking to take control of their financial future and plan for a secure retirement.</li>
          <li>You can download a PDF of your retirement plan to review and adjust as your circumstances change.</li>
=======
        <h2 className="text-2xl font-bold mb-4">About Retirement Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A retirement calculator helps you estimate the total corpus you will have at retirement.</li>
          <li>Enter your current age, planned retirement age, current savings, and monthly contributions.</li>
          <li>Specify the expected annual return on your investments to project your future wealth.</li>
          <li>The calculator provides an estimate of your total retirement savings.</li>
          <li>This tool is essential for planning your financial future and ensuring a comfortable retirement.</li>
          <li>Adjust your monthly contributions to see how it impacts your final retirement corpus.</li>
          <li>It helps you understand the importance of starting to save early for retirement.</li>
          <li>The calculator provides a clear picture of your long-term financial planning needs.</li>
          <li>Our retirement calculator is free, easy to use, and helps you set realistic savings goals.</li>
          <li>Plan for your golden years with confidence by using this powerful financial planning tool.</li>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        </ul>
      </div>
    </CalculatorWrapper>
    </>
  );
}
