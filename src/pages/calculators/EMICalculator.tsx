
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

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
    { name: 'Principal Loan Amount', value: loanAmount > 0 ? loanAmount : 0 },
    { name: 'Total Interest', value: totalInterest > 0 ? totalInterest : 0 },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `₹${v.toLocaleString()}`;

  const handleDownload = async () => {
    const chartElement = chartRef.current;
    if (!chartElement) {
      console.error("Chart element not found");
      return;
    }
    
    try {
      const canvas = await html2canvas(chartElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("EMI Calculator Report", 14, 22);

      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Loan Amount', fmt(loanAmount)],
          ['Interest Rate (%)', interestRate.toString()],
          ['Tenure (Years)', tenure.toString()],
          ['Monthly EMI', fmt(emi)],
          ['Total Interest', fmt(totalInterest)],
          ['Total Payment', fmt(totalPayment)],
        ],
        theme: 'striped',
        headStyles: { fillColor: '#0B3C5D' },
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 120;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let imageY = finalY + 15;

      if (imageY + imgHeight > doc.internal.pageSize.getHeight() - 15) {
        doc.addPage();
        imageY = 20;
      }
      
      doc.setFontSize(16);
      doc.text("Loan Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('emi-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free EMI Calculator - Calculate Your Loan EMI Online | FinovaCalc</title>
        <meta name="description" content="Easily calculate your Equated Monthly Installment (EMI) for home, car, or personal loans with FinovaCalc's free and accurate EMI calculator. Get a detailed breakdown of your monthly payments, total interest, and principal amount." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/emi" />
        <meta name="keywords" content="emi calculator, loan calculator, emi, equated monthly installment, home loan emi, car loan emi, personal loan emi, calculate emi, free emi calculator" />
        <meta property="og:title" content="Free EMI Calculator - Calculate Your Loan EMI Online | FinovaCalc" />
        <meta property="og:description" content="Easily calculate your Equated Monthly Installment (EMI) for home, car, or personal loans with FinovaCalc's free and accurate EMI calculator." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/emi" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free EMI Calculator - Calculate Your Loan EMI Online | FinovaCalc" />
        <meta name="twitter:description" content="Easily calculate your Equated Monthly Installment (EMI) for home, car, or personal loans with FinovaCalc's free and accurate EMI calculator." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="EMI Calculator"
        description="Calculate your Equal Monthly Installment (EMI) towards your loan repayment."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Amount: {fmt(loanAmount)}
              </label>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
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

            <div className="h-64 w-full mt-6" ref={chartRef}>
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
          <h2 className="text-2xl font-bold mb-4">About EMI Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An EMI calculator helps you determine the Equated Monthly Installment for any loan.</li>
            <li>Simply enter the loan amount, interest rate, and tenure to get your monthly payment.</li>
            <li>The calculator shows a comprehensive breakdown of the total interest and principal payable.</li>
            <li>It is an essential tool for financial planning, providing clarity on your monthly repayment obligations.</li>
            <li>Compare loan offers from different financial institutions by varying the inputs.</li>
            <li>The pie chart gives a visual representation of the principal versus total interest components.</li>
            <li>Adjusting the loan tenure can help you understand its impact on the EMI and total interest paid.</li>
            <li>It is a vital tool for anyone planning to take a home loan, car loan, or personal loan.</li>
            <li>Our EMI calculator is free, intuitive, and provides accurate results for informed decision-making.</li>
            <li>Take control of your loan planning with this simple yet powerful tool.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
