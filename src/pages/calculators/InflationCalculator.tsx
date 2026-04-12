
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [inflationRate, setInflationRate] = useState(3);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [purchasingPower, setPurchasingPower] = useState(0);

  useEffect(() => {
    const futureAmount = initialAmount * Math.pow(1 + (inflationRate / 100), years);
    const purchasingPowerValue = initialAmount / Math.pow(1 + (inflationRate / 100), years);

    setFutureValue(futureAmount);
    setPurchasingPower(purchasingPowerValue);
  }, [initialAmount, inflationRate, years]);

  const fmt = (v: number) => `$${v.toFixed(2).toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Inflation Calculator Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Initial Amount', fmt(initialAmount)],
        ['Annual Inflation Rate (%)', inflationRate.toString()],
        ['Number of Years', years.toString()],
        ['Future Value (Amount with same purchasing power)', fmt(futureValue)],
        ['Purchasing Power of Initial Amount in the Future', fmt(purchasingPower)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('inflation-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Inflation Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate the future value of money and the impact of inflation on your purchasing power with FinovaCalc's free inflation calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/inflation-calculator" />
        <meta name="keywords" content="inflation calculator, purchasing power calculator, future value calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Inflation Calculator"
        description="Calculate the future value of money and the impact of inflation."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Initial Amount: {fmt(initialAmount)}
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Annual Inflation Rate (%): {inflationRate}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Number of Years: {years}
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
              <h3 className="text-lg font-medium text-gray-500">Future value of {fmt(initialAmount)}</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(futureValue)}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Purchasing power of {fmt(initialAmount)} in {years} years</span>
                <span className="font-semibold">{fmt(purchasingPower)}</span>
              </div>
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
          <h2 className="text-2xl font-bold mb-4">About Inflation Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An inflation calculator helps you understand the impact of inflation on your money over time.</li>
            <li>Enter an initial amount, an inflation rate, and a number of years to see how the value of your money may change.</li>
            <li>The calculator shows you the future value of your money, which is the amount you would need in the future to have the same purchasing power as your initial amount today.</li>
            <li>It also shows you the purchasing power of your initial amount in the future.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
