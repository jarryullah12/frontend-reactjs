
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(18);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const [payoffTime, setPayoffTime] = useState("");
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = apr / 100 / 12;
    if (monthlyPayment <= balance * r) {
        setPayoffTime("Forever (or a very long time!)");
        setTotalInterest(Infinity);
        setTotalPayment(Infinity);
        return;
    }

    const n = -(Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r));
    const months = Math.ceil(n);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    setPayoffTime(`${years} years and ${remainingMonths} months`);

    const totalPaymentValue = monthlyPayment * months;
    const totalInterestValue = totalPaymentValue - balance;

    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalInterestValue);

  }, [balance, apr, monthlyPayment]);

  const data = [
    { name: 'Principal', value: balance > 0 ? balance : 0 },
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
      doc.text("Credit Card Payoff Report", 14, 22);
      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Credit Card Balance', fmt(balance)],
          ['Annual Percentage Rate (APR) (%)', apr.toString()],
          ['Monthly Payment', fmt(monthlyPayment)],
          ['Payoff Time', payoffTime],
          ['Total Principal Paid', fmt(balance)],
          ['Total Interest Paid', fmt(totalInterest)],
          ['Total Amount Paid', fmt(totalPayment)],
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
      doc.text("Payoff Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('credit-card-payoff-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Credit Card Payoff Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate how long it will take to pay off your credit card balance with FinovaCalc's free calculator. See how much interest you'll pay and create a payoff plan." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/credit-card-payoff-calculator" />
        <meta name="keywords" content="credit card payoff calculator, credit card calculator, debt calculator, interest calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Credit Card Payoff Calculator"
        description="Find out how long it will take to pay off your credit card balance."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Credit Card Balance: {fmt(balance)}
              </label>
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Percentage Rate (APR) (%): {apr}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Payment: {fmt(monthlyPayment)}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="10"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Payoff Time</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{payoffTime}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Principal Paid</span>
                <span className="font-semibold">{fmt(balance)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Interest Paid</span>
                <span className="font-semibold text-brand-accent">{fmt(totalInterest)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Amount Paid</span>
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
          <h2 className="text-2xl font-bold mb-4">About Credit Card Payoff Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A credit card payoff calculator helps you determine how long it will take to pay off your credit card balance based on your inputs.</li>
            <li>Enter your current credit card balance, the Annual Percentage Rate (APR), and your planned monthly payment.</li>
            <li>The calculator will estimate the time it will take to become debt-free, showing the payoff time in years and months.</li>
            <li>It also calculates the total interest you will pay over the loan term, which can be a powerful motivator to increase your monthly payments.</li>
            <li>This tool is essential for creating a debt reduction strategy and can help you save a significant amount of money on interest.</li>
            <li>The pie chart provides a visual breakdown of your total payment, separating the principal amount from the total interest paid.</li>
            <li>By experimenting with different monthly payment amounts, you can see how quickly you can pay off your balance and how much interest you can save.</li>
            <li>This calculator is a crucial resource for anyone with credit card debt who wants to take control of their finances.</li>
            <li>It provides a clear, actionable plan to pay off your debt and work towards financial freedom.</li>
            <li>You can download a PDF report of your payoff plan to track your progress or discuss with a financial advisor.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
