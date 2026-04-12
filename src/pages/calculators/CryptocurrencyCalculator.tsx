
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function CryptocurrencyCalculator() {
  const [initialPrice, setInitialPrice] = useState(60000);
  const [finalPrice, setFinalPrice] = useState(65000);
  const [quantity, setQuantity] = useState(1);
  const [profit, setProfit] = useState(0);
  const [returnPercentage, setReturnPercentage] = useState(0);

  useEffect(() => {
    const profitValue = (finalPrice - initialPrice) * quantity;
    const returnPercentageValue = (profitValue / (initialPrice * quantity)) * 100;
    setProfit(profitValue);
    setReturnPercentage(returnPercentageValue);
  }, [initialPrice, finalPrice, quantity]);

  const fmt = (v: number) => `₹${v.toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Cryptocurrency Calculator Report", 14, 22);
    let finalY = 0;
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Initial Price', fmt(initialPrice)],
        ['Final Price', fmt(finalPrice)],
        ['Quantity', quantity.toString()],
        ['Profit/Loss', fmt(profit)],
        ['Return on Investment (%)', `${returnPercentage.toFixed(2)}%`]
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
      didDrawPage: (data) => {
          finalY = data.cursor.y;
      }
    });

    doc.save('cryptocurrency-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Cryptocurrency Profit Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your cryptocurrency profit or loss with FinovaCalc's free calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/cryptocurrency-calculator" />
        <meta name="keywords" content="cryptocurrency calculator, crypto profit calculator, bitcoin calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Cryptocurrency Profit Calculator"
        description="Calculate your profit or loss from a cryptocurrency investment."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Initial Price: {fmt(initialPrice)}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="100"
                value={initialPrice}
                onChange={(e) => setInitialPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Final Price: {fmt(finalPrice)}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="100"
                value={finalPrice}
                onChange={(e) => setFinalPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Quantity: {quantity}
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
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
          <h2 className="text-2xl font-bold mb-4">About Cryptocurrency Profit Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A cryptocurrency profit calculator helps you determine the profit or loss from your crypto investments.</li>
            <li>Enter the initial price, the final price, and the quantity of your cryptocurrency.</li>
            <li>The calculator will show you your total profit or loss and your return on investment.</li>
            <li>This tool is essential for crypto traders to assess the performance of their investments.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
