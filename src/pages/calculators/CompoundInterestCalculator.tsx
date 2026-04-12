<<<<<<< HEAD

import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
=======
import { useState, useEffect } from 'react';
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
<<<<<<< HEAD
import html2canvas from 'html2canvas-pro';
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1);
  const [amount, setAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
<<<<<<< HEAD
  const chartRef = useRef<HTMLDivElement>(null);
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

  useEffect(() => {
    const r = rate / 100;
    const n = frequency;
    const t = years;
<<<<<<< HEAD
    const p = principal;
    const a = p * Math.pow(1 + r / n, n * t);

    setAmount(Math.round(a));
    setInterestEarned(Math.round(a - p));
  }, [principal, rate, years, frequency]);

  const data = [
    { name: 'Principal Amount', value: principal > 0 ? principal : 0 },
    { name: 'Total Interest', value: interestEarned > 0 ? interestEarned : 0 },
=======
    const a = principal * Math.pow(1 + r / n, n * t);

    setAmount(Math.round(a));
    setInterestEarned(Math.round(a - principal));
  }, [principal, rate, years, frequency]);

  const data = [
    { name: 'Principal Amount', value: principal },
    { name: 'Total Interest', value: interestEarned },
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

<<<<<<< HEAD
  const fmt = (v: number) => `₹${v.toLocaleString()}`;
=======
  const fmt = (v: number) => `$${v.toLocaleString()}`;
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

  const frequencyMap: { [key: number]: string } = {
    1: 'Annually',
    2: 'Semi-Annually',
    4: 'Quarterly',
    12: 'Monthly',
  };

<<<<<<< HEAD
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
      doc.text("Compound Interest Calculator Report", 14, 22);

      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Principal Amount', fmt(principal)],
          ['Interest Rate (%)', rate.toString()],
          ['Time Period (Years)', years.toString()],
          ['Compounding Frequency', frequencyMap[frequency]],
          ['Maturity Amount', fmt(amount)],
          ['Total Interest Earned', fmt(interestEarned)],
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
      doc.text("Investment Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('compound-interest-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
    <Helmet>
        <title>Compound Interest Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate the future value of your investment with our free compound interest calculator. See how your money can grow over time." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/compound-interest" />
        <meta name="keywords" content="compound interest calculator, investment calculator, future value calculator, interest calculator" />
    </Helmet>
=======
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Compound Interest Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Principal Amount', fmt(principal)],
        ['Interest Rate (%)', rate],
        ['Time Period (Years)', years],
        ['Compounding Frequency', frequencyMap[frequency]],
        ['Maturity Amount', fmt(amount)],
        ['Interest Earned', fmt(interestEarned)],
      ],
    });
    doc.save('compound-interest-report.pdf');
  };

  return (
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    <CalculatorWrapper
      title="Compound Interest Calculator"
      description="Calculate the future value of your investment with compound interest."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Principal Amount: {fmt(principal)}
            </label>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
<<<<<<< HEAD
              Annual Interest Rate (%): {rate}
=======
              Interest Rate (%): {rate}
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Time Period (Years): {years}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
            >
              <option value={1}>Annually</option>
              <option value={2}>Semi-Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-center w-full mb-6">
            <h3 className="text-lg font-medium text-gray-500">Maturity Amount</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(amount)}</p>
          </div>

          <div className="w-full space-y-4">
             <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-semibold">{fmt(principal)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
<<<<<<< HEAD
              <span className="text-gray-600">Total Interest Earned</span>
=======
              <span className="text-gray-600">Interest Earned</span>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
              <span className="font-semibold text-brand-accent">{fmt(interestEarned)}</span>
            </div>
          </div>

<<<<<<< HEAD
          <div className="h-64 w-full mt-6" ref={chartRef}>
=======
          <div className="h-64 w-full mt-6">
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
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
<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-4">About the Compound Interest Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A compound interest calculator is a powerful tool that demonstrates how your investment can grow over time.</li>
          <li>It helps you visualize the impact of compound interest, where you earn returns on both your initial investment and the accumulated interest.</li>
          <li>To use the calculator, you need to input the principal amount, the annual interest rate, the number of years, and how often the interest is compounded.</li>
          <li>The calculator will then show you the future value of your investment, the total interest earned, and a breakdown of your investment growth.</li>
          <li>This tool is invaluable for financial planning, whether you are saving for retirement, a home, or any other long-term goal.</li>
          <li>You can experiment with different inputs to see how changing the variables can affect the outcome.</li>
          <li>For instance, you can see how a higher interest rate or a longer investment period can significantly increase your returns.</li>
          <li>The pie chart provides a clear visual representation of the principal amount versus the interest earned, making it easy to understand the growth.</li>
          <li>By using this calculator, you can make more informed decisions about your investments and savings strategies.</li>
          <li>Start planning for your financial future today by exploring the potential of compound interest with this easy-to-use tool.</li>
        </ul>
      </div>
    </CalculatorWrapper>
    </>
=======
        <h2 className="text-2xl font-bold mb-4">About Compound Interest Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A compound interest calculator helps you understand the power of compounding on your investments.</li>
          <li>Enter the principal amount, interest rate, tenure, and compounding frequency to see your investment grow.</li>
          <li>The calculator shows the total maturity amount and the interest earned over the investment period.</li>
          <li>It's a great tool for planning your long-term financial goals, such as retirement or a child's education.</li>
          <li>You can see how different compounding frequencies (monthly, quarterly, annually) affect your returns.</li>
          <li>The pie chart visualizes the proportion of the principal amount to the total interest earned.</li>
          <li>Adjust the tenure to see how the power of compounding accelerates your wealth over time.</li>
          <li>This calculator is essential for anyone looking to make informed investment decisions.</li>
          <li>Our tool is free, easy to use, and provides accurate calculations to help you plan your future.</li>
          <li>Make the most of your investments by understanding and leveraging the magic of compound interest.</li>
        </ul>
      </div>
    </CalculatorWrapper>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
  );
}
