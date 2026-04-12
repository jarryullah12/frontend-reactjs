
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function NetWorthCalculator() {
  const [assets, setAssets] = useState(100000);
  const [liabilities, setLiabilities] = useState(25000);
  const [netWorth, setNetWorth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNetWorth(assets - liabilities);
  }, [assets, liabilities]);

  const data = [
    { name: 'Assets', value: assets > 0 ? assets : 0 },
    { name: 'Liabilities', value: liabilities > 0 ? liabilities : 0 },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

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
      doc.text("Net Worth Calculator Report", 14, 22);

      let finalY = 0;
      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Total Assets', fmt(assets)],
          ['Total Liabilities', fmt(liabilities)],
          ['Net Worth', fmt(netWorth)],
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
      doc.text("Net Worth Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('net-worth-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Net Worth Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your net worth by subtracting your liabilities from your assets with FinovaCalc's free net worth calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/net-worth-calculator" />
        <meta name="keywords" content="net worth calculator, financial health calculator, asset calculator, liability calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Net Worth Calculator"
        description="Calculate your net worth by subtracting your liabilities from your assets."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Total Assets: {fmt(assets)}
              </label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={assets}
                onChange={(e) => setAssets(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Total Liabilities: {fmt(liabilities)}
              </label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={liabilities}
                onChange={(e) => setLiabilities(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Net Worth</h3>
              <p className={`text-4xl font-bold mt-2 ${netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {fmt(netWorth)}
              </p>
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
          <h2 className="text-2xl font-bold mb-4">About Net Worth Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A net worth calculator helps you determine your financial health by subtracting your liabilities from your assets.</li>
            <li>Enter your total assets (what you own) and your total liabilities (what you owe).</li>
            <li>The calculator will show you your net worth.</li>
            <li>This tool is essential for tracking your financial progress over time.</li>
            <li>The pie chart provides a visual breakdown of your assets versus your liabilities.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
