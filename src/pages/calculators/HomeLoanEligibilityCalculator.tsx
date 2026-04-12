import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function HomeLoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI] = useState(5000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [maxLoan, setMaxLoan] = useState(0);
  const [maxEMI, setMaxEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const maxAllowedEMI = monthlyIncome * 0.5 - existingEMI;
    if (maxAllowedEMI <= 0) {
      setMaxEMI(0);
      setMaxLoan(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }
    setMaxEMI(Math.round(maxAllowedEMI));

    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    if (r === 0) {
      setMaxLoan(Math.round(maxAllowedEMI * n));
      setTotalInterest(0);
      setTotalPayment(Math.round(maxAllowedEMI * n));
      return;
    }

    const eligibleLoan = maxAllowedEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    const totalPay = maxAllowedEMI * n;
    const totalInt = totalPay - eligibleLoan;

    setMaxLoan(Math.round(eligibleLoan));
    setTotalPayment(Math.round(totalPay));
    setTotalInterest(Math.round(totalInt));
  }, [monthlyIncome, existingEMI, interestRate, tenure]);

  const data = [
    { name: 'Eligible Loan Amount', value: maxLoan > 0 ? maxLoan : 0 },
    { name: 'Total Interest', value: totalInterest > 0 ? totalInterest : 0 },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;
  
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Home Loan Eligibility Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Monthly Income', fmt(monthlyIncome)],
        ['Existing Monthly EMIs', fmt(existingEMI)],
        ['Interest Rate (%)', interestRate],
        ['Loan Tenure (Years)', tenure],
        ['Maximum Eligible Loan', fmt(maxLoan)],
        ['Max Affordable EMI', `${fmt(maxEMI)}/mo`],
        ['Total Interest Payable', fmt(totalInterest)],
        ['Total Repayment', fmt(totalPayment)],
      ],
    });
    doc.save('home-loan-eligibility-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Home Loan Eligibility Calculator - Check Your Max Loan Amount | FinovaCalc</title>
        <meta name="description" content="Determine your maximum home loan eligibility with FinovaCalc's free calculator. Based on your income and existing EMIs, find out how much you can borrow to finance your new home." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/home-loan-eligibility" />
        <meta name="keywords" content="home loan eligibility calculator, loan eligibility calculator, home loan, mortgage eligibility, loan amount calculator, housing finance" />
        <meta property="og:title" content="Home Loan Eligibility Calculator - Check Your Max Loan Amount | FinovaCalc" />
        <meta property="og:description" content="Determine your maximum home loan eligibility with FinovaCalc's free calculator. Find out how much you can borrow to finance your new home." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/home-loan-eligibility" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Loan Eligibility Calculator - Check Your Max Loan Amount | FinovaCalc" />
        <meta name="twitter:description" content="Determine your maximum home loan eligibility with FinovaCalc's free calculator. Find out how much you can borrow to finance your new home." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Home Loan Eligibility Calculator"
        description="Check your maximum home loan eligibility based on your income and existing obligations."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Income: {fmt(monthlyIncome)}
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Existing Monthly EMIs: {fmt(existingEMI)}
              </label>
              <input
                type="range"
                min="0"
                max={monthlyIncome * 0.5}
                step="1000"
                value={existingEMI}
                onChange={(e) => setExistingEMI(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={existingEMI}
                  onChange={(e) => setExistingEMI(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%): {interestRate}
              </label>
              <input
                type="range"
                min="5"
                max="18"
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
                Loan Tenure (Years): {tenure}
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-4">
              <h3 className="text-lg font-medium text-gray-500">Maximum Eligible Loan</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(maxLoan)}</p>
            </div>

            <div className="w-full space-y-4 mb-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Max Affordable EMI</span>
                <span className="font-semibold text-green-600">{fmt(maxEMI)}/mo</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Interest Payable</span>
                <span className="font-semibold text-brand-accent">{fmt(totalInterest)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Repayment</span>
                <span className="font-semibold">{fmt(totalPayment)}</span>
              </div>
            </div>

            <div className="w-full bg-blue-50 rounded-lg p-3 text-xs text-blue-800 mb-4">
              <strong>Note:</strong> Banks typically allow up to 50% of your monthly income (minus existing EMIs) towards new loan EMIs.
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((_entry, index) => (
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
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About Home Loan Eligibility Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A home loan eligibility calculator helps you determine the maximum loan amount you can borrow.</li>
            <li>Enter your monthly income, existing EMIs, desired loan tenure, and interest rate to get an estimate.</li>
            <li>The calculator considers your financial commitments to provide a realistic loan amount.</li>
            <li>It is a crucial first step in the home buying process, helping you set a budget.</li>
            <li>You can experiment with different tenures to see how it affects your eligibility and EMI.</li>
            <li>The pie chart shows the breakup of the total loan amount and the total interest payable.</li>
            <li>This tool helps you understand how your income and existing debts impact your borrowing capacity.</li>
            <li>Plan your dream home purchase with confidence by knowing your loan eligibility beforehand.</li>
            <li>Our calculator is simple to use, free, and provides accurate eligibility estimates.</li>
            <li>Make an informed decision and approach lenders with a clear understanding of your financial standing.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
