
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function StockCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(120);
  const [quantity, setQuantity] = useState(100);
  const [commission, setCommission] = useState(10);
  const [profit, setProfit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [returnPercentage, setReturnPercentage] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalCostValue = (purchasePrice * quantity) + commission;
    const totalRevenueValue = (sellPrice * quantity) - commission;
    const profitValue = totalRevenueValue - totalCostValue;
    const returnPercentageValue = (profitValue / totalCostValue) * 100;

    setTotalCost(totalCostValue);
    setTotalRevenue(totalRevenueValue);
    setProfit(profitValue);
    setReturnPercentage(returnPercentageValue);
  }, [purchasePrice, sellPrice, quantity, commission]);

  const data = [
    { name: 'Total Cost', value: totalCost > 0 ? totalCost : 0 },
    { name: 'Profit', value: profit > 0 ? profit : 0 },
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
      doc.text("Stock Calculator Report", 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Purchase Price per Share', fmt(purchasePrice)],
          ['Sell Price per Share', fmt(sellPrice)],
          ['Number of Shares', quantity.toString()],
          ['Commission ($)', fmt(commission)],
          ['Total Cost', fmt(totalCost)],
          ['Total Revenue', fmt(totalRevenue)],
          ['Profit/Loss', fmt(profit)],
          ['Return on Investment (%)', `${returnPercentage.toFixed(2)}%`],
        ],
        theme: 'striped',
        headStyles: { fillColor: '#0B3C5D' },
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 120;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      const lastTable = (doc as any).lastAutoTable;
      let imageY = lastTable.finalY + 15;

      if (imageY + imgHeight > doc.internal.pageSize.getHeight() - 15) {
        doc.addPage();
        imageY = 20;
      }
      
      doc.setFontSize(16);
      doc.text("Profit Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('stock-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Stock Profit Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your stock profit or loss with FinovaCalc's free stock calculator. See your return on investment and make informed trading decisions." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/stock-calculator" />
        <meta name="keywords" content="stock calculator, stock profit calculator, investment calculator, stock market calculator, roi calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Stock Profit Calculator"
        description="Calculate your profit or loss from a stock trade, including commissions."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Purchase Price per Share: {fmt(purchasePrice)}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Sell Price per Share: {fmt(sellPrice)}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Number of Shares: {quantity}
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Commission ($): {fmt(commission)}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Profit / Loss</h3>
              <p className={`text-4xl font-bold mt-2 ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {fmt(profit)}
              </p>
              <p className="text-lg font-medium text-gray-500 mt-2">
                Return on Investment: {returnPercentage.toFixed(2)}%
              </p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Cost</span>
                <span className="font-semibold">{fmt(totalCost)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold">{fmt(totalRevenue)}</span>
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
          <h2 className="text-2xl font-bold mb-4">About Stock Profit Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A stock profit calculator helps you determine the profit or loss from a stock trade.</li>
            <li>Enter the purchase price, sell price, number of shares, and any commission fees.</li>
            <li>The calculator will show you your total profit or loss, as well as your return on investment.</li>
            <li>This tool is essential for traders and investors to quickly assess the profitability of their trades.</li>
            <li>The pie chart provides a visual representation of your total cost versus your profit.</li>
            <li>Understanding your potential profit and loss is crucial for making informed trading decisions.</li>
            <li>The calculator helps you account for commission costs, which can impact your overall returns.</li>
            <li>By experimenting with different sell prices, you can set target prices to achieve your desired profit.</li>
            <li>This free tool is designed for both beginners and experienced investors to analyze their stock performance.</li>
            <li>You can download a PDF report of your stock trade analysis for your records.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
