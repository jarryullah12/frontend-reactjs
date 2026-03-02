import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface LoanResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

function calculateLoan(amount: number, rate: number, tenureYears: number): LoanResult {
  if (amount <= 0 || rate <= 0 || tenureYears <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }
  const r = rate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - amount;
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

export function LoanComparisonCalculator() {
  const [amountA, setAmountA] = useState(2000000);
  const [rateA, setRateA] = useState(8.5);
  const [tenureA, setTenureA] = useState(20);

  const [amountB, setAmountB] = useState(2000000);
  const [rateB, setRateB] = useState(9.5);
  const [tenureB, setTenureB] = useState(15);

  const [resultA, setResultA] = useState<LoanResult>({ emi: 0, totalInterest: 0, totalPayment: 0 });
  const [resultB, setResultB] = useState<LoanResult>({ emi: 0, totalInterest: 0, totalPayment: 0 });

  useEffect(() => {
    setResultA(calculateLoan(amountA, rateA, tenureA));
  }, [amountA, rateA, tenureA]);

  useEffect(() => {
    setResultB(calculateLoan(amountB, rateB, tenureB));
  }, [amountB, rateB, tenureB]);

  const chartData = [
    {
      name: 'Monthly EMI',
      'Loan A': resultA.emi,
      'Loan B': resultB.emi,
    },
    {
      name: 'Total Interest',
      'Loan A': resultA.totalInterest,
      'Loan B': resultB.totalInterest,
    },
    {
      name: 'Total Payment',
      'Loan A': resultA.totalPayment,
      'Loan B': resultB.totalPayment,
    },
  ];

  const inputClass = "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6";

  const fmt = (v: number) => `$${v.toLocaleString()}`;
  
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Loan Comparison Report", 20, 10);

    // Loan A Table
    autoTable(doc, {
      head: [['Loan A', '']],
      body: [
        ['Loan Amount', fmt(amountA)],
        ['Interest Rate (%)', rateA],
        ['Tenure (Years)', tenureA],
        ['Monthly EMI', fmt(resultA.emi)],
        ['Total Interest', fmt(resultA.totalInterest)],
        ['Total Payment', fmt(resultA.totalPayment)],
      ],
      startY: 20
    });
    
    // Loan B Table
    autoTable(doc, {
      head: [['Loan B', '']],
      body: [
        ['Loan Amount', fmt(amountB)],
        ['Interest Rate (%)', rateB],
        ['Tenure (Years)', tenureB],
        ['Monthly EMI', fmt(resultB.emi)],
        ['Total Interest', fmt(resultB.totalInterest)],
        ['Total Payment', fmt(resultB.totalPayment)],
      ],
      startY: (doc as any).lastAutoTable.finalY + 10
    });

    const savingsText = resultA.totalInterest < resultB.totalInterest
              ? `Loan A saves you ${fmt(resultB.totalInterest - resultA.totalInterest)} in interest!`
              : resultB.totalInterest < resultA.totalInterest
              ? `Loan B saves you ${fmt(resultA.totalInterest - resultB.totalInterest)} in interest!`
              : 'Both loans have the same total interest.';
              
    doc.text(savingsText, 20, (doc as any).lastAutoTable.finalY + 10);


    doc.save('loan-comparison-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Loan Comparison Calculator - Compare Two Loans Side-by-Side | FinovaCalc</title>
        <meta name="description" content="Compare two loan offers side-by-side with FinovaCalc's free loan comparison calculator. Analyze EMI, total interest, and total payment to choose the best loan for your needs." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/loan-comparison" />
        <meta name="keywords" content="loan comparison calculator, compare loans, loan calculator, emi comparison, loan interest calculator, financial calculator" />
        <meta property="og:title" content="Loan Comparison Calculator - Compare Two Loans Side-by-Side | FinovaCalc" />
        <meta property="og:description" content="Compare two loan offers side-by-side with FinovaCalc's free loan comparison calculator. Analyze EMI, total interest, and total payment to choose the best loan for your needs." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/loan-comparison" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loan Comparison Calculator - Compare Two Loans Side-by-Side | FinovaCalc" />
        <meta name="twitter:description" content="Compare two loan offers side-by-side with FinovaCalc's free loan comparison calculator. Analyze EMI, total interest, and total payment to choose the best loan for your needs." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Loan Comparison Calculator"
        description="Compare two loan offers side by side to find the best deal."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Loan A */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-brand-primary mb-6 text-center">Loan A</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Loan Amount</label>
                <input type="number" value={amountA} onChange={(e) => setAmountA(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Interest Rate (%)</label>
                <input type="number" step="0.1" value={rateA} onChange={(e) => setRateA(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Tenure (Years)</label>
                <input type="number" value={tenureA} onChange={(e) => setTenureA(Number(e.target.value))} className={inputClass} />
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-blue-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Monthly EMI</span>
                <span className="font-bold text-brand-primary">{fmt(resultA.emi)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Interest</span>
                <span className="font-semibold text-brand-accent">{fmt(resultA.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Payment</span>
                <span className="font-semibold">{fmt(resultA.totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* Loan B */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-bold text-brand-accent mb-6 text-center">Loan B</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Loan Amount</label>
                <input type="number" value={amountB} onChange={(e) => setAmountB(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Interest Rate (%)</label>
                <input type="number" step="0.1" value={rateB} onChange={(e) => setRateB(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Tenure (Years)</label>
                <input type="number" value={tenureB} onChange={(e) => setTenureB(Number(e.target.value))} className={inputClass} />
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-yellow-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Monthly EMI</span>
                <span className="font-bold text-brand-accent">{fmt(resultB.emi)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Interest</span>
                <span className="font-semibold text-brand-accent">{fmt(resultB.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Payment</span>
                <span className="font-semibold">{fmt(resultB.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10 text-center">
          <h3 className="text-lg font-bold text-green-800">
            {resultA.totalInterest < resultB.totalInterest
              ? `🎉 Loan A saves you ${fmt(resultB.totalInterest - resultA.totalInterest)} in interest!`
              : resultB.totalInterest < resultA.totalInterest
              ? `🎉 Loan B saves you ${fmt(resultA.totalInterest - resultB.totalInterest)} in interest!`
              : 'Both loans have the same total interest.'}
          </h3>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Visual Comparison</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => fmt(Number(value))} />
                <Legend />
                <Bar dataKey="Loan A" fill="#0B3C5D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Loan B" fill="#D9B310" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
           <div className="mt-6 text-center">
              <button 
                onClick={handleDownload}
                className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark"
              >
                Download PDF
              </button>
            </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About Loan Comparison Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A loan comparison calculator allows you to evaluate two different loan offers simultaneously.</li>
            <li>Enter the loan amount, interest rate, and tenure for each loan to see a side-by-side comparison.</li>
            <li>The calculator shows the EMI, total interest, and total payment for both loans.</li>
            <li>This tool is invaluable for making an informed decision when choosing between lenders.</li>
            <li>The bar chart provides a clear visual comparison of the key loan metrics.</li>
            <li>See the exact amount of interest you can save by choosing the better loan offer.</li>
            <li>Experiment with different loan parameters to understand their impact on the overall cost.</li>
            <li>A must-use tool for anyone considering a home loan, personal loan, or car loan.</li>
            <li>Our calculator is free, easy to use, and helps you choose the most economical loan.</li>
            <li>Empower yourself with data to negotiate better terms and save money on interest payments.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
