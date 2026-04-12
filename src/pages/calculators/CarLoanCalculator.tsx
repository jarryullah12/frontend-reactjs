
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = carPrice - downPayment;
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
  }, [carPrice, downPayment, interestRate, tenure]);

  const downPaymentPercent = carPrice > 0 ? ((downPayment / carPrice) * 100).toFixed(1) : '0';

  const data = [
    { name: 'Loan Principal', value: loanAmount > 0 ? loanAmount : 0 },
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
      doc.text("Car Loan Calculator Report", 14, 22);
      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Car Price', fmt(carPrice)],
          ['Down Payment', `${fmt(downPayment)} (${downPaymentPercent}%)`],
          ['Interest Rate (%)', interestRate.toString()],
          ['Loan Tenure (Years)', tenure.toString()],
          ['Monthly Car Loan EMI', fmt(emi)],
          ['Loan Amount', fmt(loanAmount)],
          ['Total Interest', fmt(totalInterest)],
          ['Total Amount Payable', fmt(totalPayment + downPayment)],
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

      doc.save('car-loan-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Car Loan EMI Calculator - Free & Accurate Online Tool | FinovaCalc</title>
        <meta name="description" content="Calculate your car loan EMI with FinovaCalc's easy-to-use online calculator. Get instant results for your monthly payments, total interest, and plan your car purchase budget." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/car-loan" />
        <meta name="keywords" content="car loan calculator, car loan emi calculator, auto loan calculator, emi calculator, vehicle loan, car finance" />
        <meta property="og:title" content="Car Loan EMI Calculator - Free & Accurate Online Tool | FinovaCalc" />
        <meta property="og:description" content="Calculate your car loan EMI with FinovaCalc's easy-to-use online calculator. Get instant results and plan your car purchase budget." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/car-loan" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Car Loan EMI Calculator - Free & Accurate Online Tool | FinovaCalc" />
        <meta name="twitter:description" content="Calculate your car loan EMI with FinovaCalc's easy-to-use online calculator. Get instant results and plan your car purchase budget." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
      <CalculatorWrapper
        title="Car Loan Calculator"
        description="Find out how much your dream car will cost you monthly with a car loan."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Car Price: {fmt(carPrice)}
              </label>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="mt-2">
                <input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
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
                max={carPrice}
                step="10000"
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
                max="25"
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
                max="7"
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
              <h3 className="text-lg font-medium text-gray-500">Monthly Car Loan EMI</h3>
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
                <span className="text-gray-600">Total Amount Payable</span>
                <span className="font-semibold">{fmt(totalPayment + downPayment)}</span>
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
          <h2 className="text-2xl font-bold mb-4">About Car Loan Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A car loan calculator helps you estimate the Equated Monthly Installment (EMI) for your car loan.</li>
            <li>Instantly calculate your monthly car loan EMI by entering the car price, down payment, interest rate, and loan tenure.</li>
            <li>The calculator provides a detailed breakdown of the total interest payable and the total amount you will pay by the end of the loan tenure.</li>
            <li>This tool is essential for financial planning, giving you a clear picture of your monthly financial commitment.</li>
            <li>Compare loan offers from various lenders by adjusting the interest rate and tenure to find the best deal.</li>
            <li>The pie chart provides a visual representation of the principal loan amount versus the total interest paid.</li>
            <li>Experiment with different down payment amounts to see how it affects your EMI and total interest.</li>
            <li>A crucial tool for anyone planning to buy a new or used car on finance.</li>
            <li>Our car loan calculator is user-friendly, free, and delivers precise results based on your inputs.</li>
            <li>Empower yourself to make well-informed decisions about your car purchase with this easy-to-use calculator.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
