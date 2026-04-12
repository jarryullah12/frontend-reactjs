
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const n = years * 12;
    const r = annualReturn / 100 / 12;

    const futureValueOfInitialInvestment = initialInvestment * Math.pow(1 + r, n);
    const futureValueOfContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const totalFutureValue = futureValueOfInitialInvestment + futureValueOfContributions;
    const totalContributions = initialInvestment + (monthlyContribution * n);
    const totalInterestValue = totalFutureValue - totalContributions;

    setFutureValue(Math.round(totalFutureValue));
    setTotalContribution(Math.round(totalContributions));
    setTotalInterest(Math.round(totalInterestValue));
  }, [initialInvestment, monthlyContribution, annualReturn, years]);

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
      doc.text("Investment Calculator Report", 14, 22);
      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Initial Investment', fmt(initialInvestment)],
          ['Monthly Contribution', fmt(monthlyContribution)],
          ['Annual Rate of Return (%)', annualReturn.toString()],
          ['Investment Period (Years)', years.toString()],
          ['Future Value of Investment', fmt(futureValue)],
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
      doc.text("Investment Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('investment-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Investment Calculator - FinovaCalc</title>
        <meta name="description" content="Project the growth of your investments over time with FinovaCalc's free investment calculator. See how your money can grow with compound interest." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/investment-calculator" />
        <meta name="keywords" content="investment calculator, compound interest calculator, stock market calculator, investment growth, retirement calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Investment Calculator"
        description="See how your investments can grow over time with the power of compound interest."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Initial Investment: {fmt(initialInvestment)}
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
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

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Investment Period (Years): {years}
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
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Future Value of Investment</h3>
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
          <h2 className="text-2xl font-bold mb-4">About Investment Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An investment calculator helps you project the future value of your investments.</li>
            <li>Enter your initial investment, monthly contribution, expected annual rate of return, and the number of years you plan to invest.</li>
            <li>The calculator shows how your investment can grow over time with the power of compounding.</li>
            <li>It also shows the total amount of your contributions versus the total interest earned.</li>
            <li>This tool is essential for financial planning and setting investment goals.</li>
            <li>The pie chart provides a visual breakdown of your contributions versus your earnings.</li>
            <li>Experiment with different contribution amounts and rates of return to see how they impact your future wealth.</li>
            <li>A powerful tool for visualizing long-term growth and motivating you to stick to your investment plan.</li>
            <li>Our investment calculator is user-friendly, free, and provides accurate projections to help you make informed financial decisions.</li>
            <li>Download a PDF of your investment projection to review and adjust your strategy as needed.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
