
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const calculateInterest = interestRate / 100 / 12;
    const calculatedPayments = loanTerm * 12;

    const x = Math.pow(1 + calculateInterest, calculatedPayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);
    const monthlyPaymentCalculated = isFinite(monthly) ? monthly : 0;
    
    const totalPaymentCalculated = monthlyPaymentCalculated * calculatedPayments;
    const totalInterestCalculated = totalPaymentCalculated - principal;

    setMonthlyPayment(monthlyPaymentCalculated);
    setTotalInterest(totalInterestCalculated);
    setTotalPayment(totalPaymentCalculated);
  }, [loanAmount, interestRate, loanTerm]);

  const fmt = (v: number) => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const data = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Loan Calculator Report", 14, 22);
    let finalY = 0;
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Loan Amount', fmt(loanAmount)],
        ['Interest Rate (%)', `${interestRate}%`],
        ['Loan Term (Years)', `${loanTerm} years`],
        ['Monthly Payment', fmt(monthlyPayment)],
        ['Total Interest', fmt(totalInterest)],
        ['Total Payment', fmt(totalPayment)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
      didDrawPage: (data) => {
          finalY = data.cursor.y;
      }
    });

    doc.save('loan-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Loan Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your loan payments with FinovaCalc's free loan calculator. Find out your monthly payments for any loan type." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/loan-calculator" />
        <meta name="keywords" content="loan calculator, emi calculator, loan payment calculator, mortgage calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Loan Calculator"
        description="Calculate your monthly loan payments, total interest, and total payment."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Amount: {fmt(loanAmount)}
              </label>
              <input
                type="range"
                min="1000"
                max="10000000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%): {interestRate}
              </label>
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Term (Years): {loanTerm}
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Monthly Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(monthlyPayment)}</p>
            </div>

            <div className="w-full h-64">
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
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => fmt(Number(value))} />
                    <Legend />
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
          <h2 className="text-2xl font-bold mb-4">About the Loan Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A loan calculator helps you determine the monthly payments on a loan.</li>
            <li>Enter the loan amount, interest rate, and loan term to calculate your monthly payment.</li>
            <li>The calculator also shows the total interest paid over the life of the loan and the total amount you will pay back.</li>
            <li>This tool is useful for comparing different loan offers and for financial planning.</li>
            <li>The pie chart visualizes the breakdown of the total payment into principal and interest.</li>
            <li>You can use this for various types of loans like personal loans, auto loans, or mortgages.</li>
            <li>The sliders allow you to easily adjust the loan parameters and see the immediate impact on your monthly payments.</li>
            <li>Understanding your loan payments is crucial for budgeting and managing your finances effectively.</li>
            <li>This calculator helps you make informed decisions before taking on debt.</li>
            <li>You can download a PDF summary of your loan details for your records.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
