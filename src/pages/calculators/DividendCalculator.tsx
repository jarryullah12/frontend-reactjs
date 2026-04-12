
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function DividendCalculator() {
  const [stockPrice, setStockPrice] = useState(100);
  const [dividendPerShare, setDividendPerShare] = useState(2);
  const [numberOfShares, setNumberOfShares] = useState(100);
  const [dividendYield, setDividendYield] = useState(0);
  const [annualDividend, setAnnualDividend] = useState(0);

  useEffect(() => {
    const yieldValue = (dividendPerShare / stockPrice) * 100;
    const annualDividendValue = dividendPerShare * numberOfShares;
    setDividendYield(yieldValue);
    setAnnualDividend(annualDividendValue);
  }, [stockPrice, dividendPerShare, numberOfShares]);

  const fmt = (v: number) => `₹${v.toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Dividend Calculator Report", 14, 22);
    let finalY = 0;
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Stock Price', fmt(stockPrice)],
        ['Dividend per Share', fmt(dividendPerShare)],
        ['Number of Shares', numberOfShares.toString()],
        ['Dividend Yield (%)', `${dividendYield.toFixed(2)}%`],
        ['Annual Dividend Income', fmt(annualDividend)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
      didDrawPage: (data) => {
          finalY = data.cursor.y;
      }
    });

    doc.save('dividend-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Dividend Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate dividend yield and annual dividend income with FinovaCalc's free dividend calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/dividend-calculator" />
        <meta name="keywords" content="dividend calculator, dividend yield calculator, stock dividend calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Dividend Calculator"
        description="Calculate dividend yield and annual dividend income."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Stock Price: {fmt(stockPrice)}
              </label>
              <input
                type="range"
                min="1"
                max="1000"
                step="1"
                value={stockPrice}
                onChange={(e) => setStockPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Dividend per Share: {fmt(dividendPerShare)}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={dividendPerShare}
                onChange={(e) => setDividendPerShare(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Number of Shares: {numberOfShares}
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={numberOfShares}
                onChange={(e) => setNumberOfShares(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Dividend Yield</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{dividendYield.toFixed(2)}%</p>
            </div>
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Annual Dividend Income</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(annualDividend)}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Dividend Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A dividend calculator helps you determine the dividend yield of a stock and your annual dividend income.</li>
            <li>Enter the stock price, the dividend per share, and the number of shares you own.</li>
            <li>The calculator will show you the dividend yield and your total annual dividend income.</li>
            <li>This tool is essential for dividend investors to assess the return on their investments.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
