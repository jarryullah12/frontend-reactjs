
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function BudgetCalculator() {
  const [income, setIncome] = useState(5000);
  const [housing, setHousing] = useState(1500);
  const [transportation, setTransportation] = useState(500);
  const [food, setFood] = useState(500);
  const [utilities, setUtilities] = useState(200);
  const [other, setOther] = useState(1000);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = housing + transportation + food + utilities + other;
    setTotalExpenses(total);
    setRemaining(income - total);
  }, [income, housing, transportation, food, utilities, other]);

  const data = [
    { name: 'Housing', value: housing },
    { name: 'Transportation', value: transportation },
    { name: 'Food', value: food },
    { name: 'Utilities', value: utilities },
    { name: 'Other', value: other },
    { name: 'Remaining', value: remaining > 0 ? remaining : 0 },
  ];

  const COLORS = ['#0B3C5D', '#328CC1', '#D9B310', '#984B43', '#76323F', '#626E60'];

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
      doc.text("Budget Calculator Report", 14, 22);
      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Monthly Income', fmt(income)],
          ['Housing', fmt(housing)],
          ['Transportation', fmt(transportation)],
          ['Food', fmt(food)],
          ['Utilities', fmt(utilities)],
          ['Other Expenses', fmt(other)],
          ['Total Expenses', fmt(totalExpenses)],
          ['Remaining Income', fmt(remaining)],
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
      doc.text("Budget Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('budget-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Budget Calculator - FinovaCalc</title>
        <meta name="description" content="Create a monthly budget and track your expenses with FinovaCalc's free budget calculator. See where your money is going and find opportunities to save." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/budget-calculator" />
        <meta name="keywords" content="budget calculator, monthly budget planner, expense tracker, savings calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Budget Calculator"
        description="Create a monthly budget to track your income and expenses."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Income: {fmt(income)}
              </label>
              <input
                type="range"
                min="1000"
                max="20000"
                step="100"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Housing: {fmt(housing)}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={housing}
                onChange={(e) => setHousing(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Transportation: {fmt(transportation)}
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={transportation}
                onChange={(e) => setTransportation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Food: {fmt(food)}
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Utilities: {fmt(utilities)}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={utilities}
                onChange={(e) => setUtilities(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Other: {fmt(other)}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={other}
                onChange={(e) => setOther(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Remaining Income</h3>
              <p className={`text-4xl font-bold mt-2 ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {fmt(remaining)}
              </p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Expenses</span>
                <span className="font-semibold">{fmt(totalExpenses)}</span>
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
          <h2 className="text-2xl font-bold mb-4">About Budget Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A budget calculator helps you track your monthly income and expenses to manage your finances effectively.</li>
            <li>Enter your monthly income and your estimated monthly expenses in various categories like housing, food, and transportation.</li>
            <li>The calculator will show you how much money you have remaining after your expenses, highlighting your potential savings or shortfall.</li>
            <li>This tool is essential for creating a budget and identifying areas where you can cut back on spending to save more.</li>
            <li>The pie chart provides a visual breakdown of your expenses, making it easy to see where your money is going.</li>
            <li>Use the sliders to quickly adjust your budget and see the immediate impact on your remaining income.</li>
            <li>By regularly using a budget calculator, you can gain control over your financial health and work towards your financial goals.</li>
            <li>A clear budget is the foundation of good financial planning, helping you to avoid debt and build savings.</li>
            <li>This interactive tool makes budgeting simple and intuitive, even for those new to tracking their finances.</li>
            <li>Download a PDF report of your budget for your records, to review with a financial advisor, or to track your progress over time.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
