import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11);
  const [tenure, setTenure] = useState(3);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - p;

    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(totalPaymentValue));
    setTotalInterest(Math.round(totalInterestValue));
  }, [loanAmount, interestRate, tenure]);

  const data = [
    { name: 'Principal Loan Amount', value: loanAmount },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Personal Loan Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Loan Amount', fmt(loanAmount)],
        ['Interest Rate (%)', interestRate],
        ['Tenure (Years)', tenure],
        ['Monthly EMI', fmt(emi)],
        ['Total Interest', fmt(totalInterest)],
        ['Total Payment', fmt(totalPayment)],
      ],
    });
    doc.save('personal-loan-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Personal Loan EMI Calculator - Estimate Your Monthly Payments | FinovaCalc</title>
        <meta name="description" content="Calculate the EMI for your personal loan with FinovaCalc's free online calculator. Enter the loan amount, interest rate, and tenure to get instant, accurate results and plan your finances effectively." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/personal-loan" />
        <meta name="keywords" content="personal loan calculator, personal loan emi calculator, loan emi calculator, emi calculator, loan planning, free loan calculator" />
        <meta property="og:title" content="Personal Loan EMI Calculator - Estimate Your Monthly Payments | FinovaCalc" />
        <meta property="og:description" content="Calculate the EMI for your personal loan with FinovaCalc's free online calculator. Get instant, accurate results and plan your finances effectively." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/personal-loan" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Loan EMI Calculator - Estimate Your Monthly Payments | FinovaCalc" />
        <meta name="twitter:description" content="Calculate the EMI for your personal loan with FinovaCalc's free online calculator. Get instant, accurate results and plan your finances effectively." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Personal Loan Calculator"
        description="Plan your personal loan repayments with our easy-to-use calculator."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Amount: {fmt(loanAmount)}
              </label>
              <input
                type="range"
                min="5000"
                max="5000000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                max="30"
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
                Tenure (Years): {tenure}
              </label>
              <input
                type="range"
                min="1"
                max="10"
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
              <h3 className="text-lg font-medium text-gray-500">Monthly EMI</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(emi)}</p>
            </div>

            <div className="w-full space-y-4">
               <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Interest</span>
                <span className="font-semibold">{fmt(totalInterest)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Payment</span>
                <span className="font-semibold">{fmt(totalPayment)}</span>
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
                  <Legend verticalAlign="bottom" height={36}/>
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
          <h2 className="text-2xl font-bold mb-4">About Personal Loan Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A personal loan calculator helps you estimate the Equated Monthly Installment (EMI) for a loan.</li>
            <li>Enter the loan amount, interest rate, and tenure to get instant results.</li>
            <li>The calculator shows a detailed breakdown of the total interest payable and the total amount.</li>
            <li>It helps in financial planning by providing a clear picture of your monthly outgo.</li>
            <li>You can compare offers from different banks by changing the interest rate and tenure.</li>
            <li>The pie chart visualizes the ratio of the principal amount to the total interest.</li>
            <li>Adjusting the tenure can show you how the EMI and total interest change over time.</li>
            <li>It's a crucial tool for anyone considering a personal loan for any purpose.</li>
            <li>Our calculator is free to use and provides accurate results based on your inputs.</li>
            <li>Make informed decisions about your borrowing with this easy-to-use tool.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
