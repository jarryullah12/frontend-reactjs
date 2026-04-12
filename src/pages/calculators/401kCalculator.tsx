
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function Calculator401k() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [futureValue, setFutureValue] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
      setFutureValue(currentSavings);
      setTotalContribution(currentSavings);
      setTotalInterest(0);
      return;
    }

    const n = yearsToRetirement * 12;
    const r = annualReturn / 100 / 12;

    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + r, n);
    const futureValueOfContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const totalFutureValue = futureValueOfCurrentSavings + futureValueOfContributions;
    const totalContributions = currentSavings + (monthlyContribution * n);
    const totalInterestValue = totalFutureValue - totalContributions;

    setFutureValue(Math.round(totalFutureValue));
    setTotalContribution(Math.round(totalContributions));
    setTotalInterest(Math.round(totalInterestValue));
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn]);

  const data = [
    { name: 'Total Contributions', value: totalContribution > 0 ? totalContribution : 0 },
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
      doc.text("401(k) Calculator Report", 14, 22);
      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Current Age', currentAge.toString()],
          ['Retirement Age', retirementAge.toString()],
          ['Current 401(k) Savings', fmt(currentSavings)],
          ['Monthly Contribution', fmt(monthlyContribution)],
          ['Annual Rate of Return (%)', annualReturn.toString()],
          ['Estimated 401(k) Balance at Retirement', fmt(futureValue)],
          ['Total Contributions', fmt(totalContribution)],
          ['Total Interest Earned', fmt(totalInterest)],
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
      doc.text("Retirement Savings Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('401k-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>401(k) Retirement Calculator - FinovaCalc</title>
        <meta name="description" content="Estimate your 401(k) growth and retirement savings with FinovaCalc's free calculator. Project your future balance based on contributions, returns, and more." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/401k-calculator" />
        <meta name="keywords" content="401k calculator, retirement calculator, investment calculator, 401k growth, retirement savings" />
      </Helmet>
      <CalculatorWrapper
        title="401(k) Calculator"
        description="Project the future value of your 401(k) and see how your savings can grow over time."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Current Age: {currentAge}
              </label>
              <input
                type="range"
                min="18"
                max="100"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Retirement Age: {retirementAge}
              </label>
              <input
                type="range"
                min="18"
                max="100"
                step="1"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Current 401(k) Savings: {fmt(currentSavings)}
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Contribution: {fmt(monthlyContribution)}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Rate of Return (%): {annualReturn}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Estimated 401(k) Balance at Retirement</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(futureValue)}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Contributions</span>
                <span className="font-semibold">{fmt(totalContribution)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Interest Earned</span>
                <span className="font-semibold text-brand-accent">{fmt(totalInterest)}</span>
              </div>
            </div>

            <div className="h-64 w-full mt-6"  ref={chartRef}>
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
          <h2 className="text-2xl font-bold mb-4">About the 401(k) Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A 401(k) calculator is a tool to help you project the future value of your retirement savings.</li>
            <li>It takes into account your current age, desired retirement age, current 401(k) balance, monthly contributions, and expected annual return.</li>
            <li>The calculator shows you an estimate of your total 401(k) balance at retirement, broken down by your contributions and the interest earned.</li>
            <li>This helps you understand the long-term growth potential of your investments through the power of compounding.</li>
            <li>By adjusting the inputs, you can see how different scenarios, such as increasing your monthly contribution, can impact your retirement savings.</li>
            <li>The pie chart provides a visual representation of your contributions versus the interest earned, making it easy to see how your money is working for you.</li>
            <li>This calculator is a great way to stay on track with your retirement goals and make informed decisions about your financial future.</li>
            <li>It is important to remember that the annual rate of return is an estimate, and actual market performance may vary.</li>
            <li>For a comprehensive retirement plan, it is always a good idea to consult with a financial advisor.</li>
            <li>The PDF download feature allows you to save a snapshot of your retirement projection for your records or to discuss with your advisor.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
