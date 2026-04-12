<<<<<<< HEAD

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState(250000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const p = principal;

    const payment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(payment);
  }, [principal, interestRate, loanTerm]);
=======
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);

  useEffect(() => {
    const p = homePrice - downPayment;
    setLoanAmount(p);
    if (p <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    if (r === 0) {
      setEmi(Math.round(p / n));
      setTotalInterest(0);
      setTotalPayment(p);
      return;
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - p;

    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(totalPaymentValue));
    setTotalInterest(Math.round(totalInterestValue));
  }, [homePrice, downPayment, interestRate, tenure]);

  const downPaymentPercent = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0';

  const data = [
    { name: 'Principal (Loan)', value: loanAmount > 0 ? loanAmount : 0 },
    { name: 'Total Interest', value: totalInterest > 0 ? totalInterest : 0 },
    { name: 'Down Payment', value: downPayment > 0 ? downPayment : 0 },
  ];

  const COLORS = ['#0B3C5D', '#D9B310', '#328CC1'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Mortgage Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Home Price', fmt(homePrice)],
        ['Down Payment', `${fmt(downPayment)} (${downPaymentPercent}%)`],
        ['Interest Rate (%)', interestRate],
        ['Loan Tenure (Years)', tenure],
        ['Monthly Mortgage Payment', fmt(emi)],
        ['Loan Amount', fmt(loanAmount)],
        ['Total Interest', fmt(totalInterest)],
        ['Total Cost of Home', fmt(totalPayment + downPayment)],
      ],
    });
    doc.save('mortgage-report.pdf');
  };
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

  return (
    <>
      <Helmet>
<<<<<<< HEAD
        <title>Mortgage Calculator</title>
        <meta name="description" content="Estimate your monthly mortgage payments." />
      </Helmet>
      <CalculatorWrapper
        title="Mortgage Calculator"
        description="Estimate your monthly mortgage payment."
=======
        <title>Mortgage Calculator - Estimate Monthly Home Loan Payments | FinovaCalc</title>
        <meta name="description" content="Use FinovaCalc's free mortgage calculator to estimate your monthly payments, including principal and interest. Plan your home purchase with confidence by analyzing different loan scenarios." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/mortgage" />
        <meta name="keywords" content="mortgage calculator, home loan calculator, mortgage payment calculator, emi calculator, real estate, home financing, loan amortization" />
        <meta property="og:title" content="Mortgage Calculator - Estimate Monthly Home Loan Payments | FinovaCalc" />
        <meta property="og:description" content="Use FinovaCalc's free mortgage calculator to estimate your monthly payments. Plan your home purchase with confidence by analyzing different loan scenarios." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/mortgage" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mortgage Calculator - Estimate Monthly Home Loan Payments | FinovaCalc" />
        <meta name="twitter:description" content="Use FinovaCalc's free mortgage calculator to estimate your monthly payments. Plan your home purchase with confidence by analyzing different loan scenarios." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Mortgage Calculator"
        description="Estimate your monthly mortgage payments including principal and interest."
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
<<<<<<< HEAD
                Loan Amount
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Monthly Mortgage Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{monthlyPayment.toFixed(2)}</p>
=======
                Home Price: {fmt(homePrice)}
              </label>
              <input
                type="range"
                min="500000"
                max="50000000"
                step="100000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Down Payment: {fmt(downPayment)} ({downPaymentPercent}%)
              </label>
              <input
                type="range"
                min="0"
                max={homePrice}
                step="50000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%): {interestRate}
              </label>
              <input
                type="range"
                min="1"
                max="20"
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Tenure (Years): {tenure}
              </label>
              <input
                type="range"
                min="1"
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Monthly Mortgage Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(emi)}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Loan Amount</span>
                <span className="font-semibold">{fmt(loanAmount)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Down Payment</span>
                <span className="font-semibold">{fmt(downPayment)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Interest</span>
                <span className="font-semibold text-brand-accent">{fmt(totalInterest)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Cost of Home</span>
                <span className="font-semibold">{fmt(totalPayment + downPayment)}</span>
              </div>
            </div>

            <div className="h-64 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
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
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
            </div>
          </div>
        </div>
        <div className="mt-8">
<<<<<<< HEAD
            <h2 className="text-2xl font-bold mb-4">About the Mortgage Calculator</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>A mortgage calculator is an essential tool for anyone considering buying a home.</li>
                <li>It helps you estimate your monthly mortgage payment based on the loan amount, interest rate, and loan term.</li>
                <li>By entering these key variables, you can get a clear picture of what your monthly housing expense will look like.</li>
                <li>The loan amount is the price of the home minus your down payment.</li>
                <li>The interest rate is the annual rate charged by the lender. Even small changes in the interest rate can significantly impact your monthly payment.</li>
                <li>The loan term is the length of time you have to repay the loan, typically 15 or 30 years.</li>
                <li>This calculator uses the standard formula to calculate the principal and interest portion of your monthly payment.</li>
                <li>It's important to remember that this calculation does not include other costs such as property taxes, homeowners' insurance, or private mortgage insurance (PMI), which are often included in a total monthly mortgage payment.</li>
                <li>Using this calculator can help you determine how much house you can afford and experiment with different loan scenarios to find a payment that fits your budget.</li>
                <li>Being well-informed about your potential mortgage payment is a critical step in the home-buying process, and this tool is designed to provide you with the clarity you need.</li>
            </ul>
=======
          <h2 className="text-2xl font-bold mb-4">About Mortgage Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A mortgage calculator helps estimate your monthly payments for a home loan.</li>
            <li>Enter the home price, down payment, interest rate, and tenure to get your EMI.</li>
            <li>The calculator provides a detailed breakdown of the total interest and principal amount.</li>
            <li>It is an essential tool for financial planning before purchasing a property.</li>
            <li>Compare different loan scenarios by adjusting the interest rate and tenure.</li>
            <li>The pie chart visualizes the components of your total payment: principal, interest, and down payment.</li>
            <li>Understand how a larger down payment can reduce your EMI and total interest.</li>
            <li>This tool is crucial for first-time homebuyers to understand their financial commitment.</li>
            <li>Our mortgage calculator is free, easy to use, and provides accurate results.</li>
            <li>Make an informed decision on your home purchase with a clear view of your mortgage obligations.</li>
          </ul>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        </div>
      </CalculatorWrapper>
    </>
  );
}
