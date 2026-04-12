import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [roi, setRoi] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  useEffect(() => {
    const profit = finalValue - initialInvestment;
    const roiValue = initialInvestment === 0 ? 0 : (profit / initialInvestment) * 100;

    setNetProfit(profit);
    setRoi(Number(roiValue.toFixed(2)));
  }, [initialInvestment, finalValue]);

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Investment Return (ROI) Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Initial Investment', fmt(initialInvestment)],
        ['Final Value of Investment', fmt(finalValue)],
        ['Return on Investment (ROI)', `${roi}%`],
        ['Net Profit / Loss', fmt(netProfit)],
      ],
    });
    doc.save('roi-report.pdf');
  };

  return (
    <>
    <Helmet>
        <title>Investment Return (ROI) Calculator - Calculate Your Profit | FinovaCalc</title>
        <meta name="description" content="Calculate the Return on Investment (ROI) for your investments with FinovaCalc's free ROI calculator. Easily measure the profitability of your investments and make informed financial decisions." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/roi" />
        <meta name="keywords" content="roi calculator, return on investment calculator, investment calculator, profit calculator, investment return, finance calculator" />
        <meta property="og:title" content="Investment Return (ROI) Calculator - Calculate Your Profit | FinovaCalc" />
        <meta property="og:description" content="Calculate the Return on Investment (ROI) for your investments with FinovaCalc's free ROI calculator. Easily measure the profitability of your investments." />
        <meta property="og:url" content="https://www.finovacalc.com/calculators/roi" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/vj8o5vj.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investment Return (ROI) Calculator - Calculate Your Profit | FinovaCalc" />
        <meta name="twitter:description" content="Calculate the Return on Investment (ROI) for your investments with FinovaCalc's free ROI calculator. Easily measure the profitability of your investments." />
        <meta name="twitter:image" content="https://i.imgur.com/vj8o5vj.png" />
      </Helmet>
    <CalculatorWrapper
      title="Investment Return (ROI) Calculator"
      description="Calculate the percentage return on your investment."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Initial Investment
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Final Value of Investment
            </label>
             <input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-center w-full mb-6">
            <h3 className="text-lg font-medium text-gray-500">Return on Investment (ROI)</h3>
            <p className={`text-5xl font-bold mt-2 ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roi}%
            </p>
          </div>

          <div className="w-full space-y-4">
             <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Net Profit / Loss</span>
              <span className={`font-semibold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fmt(netProfit)}
              </span>
            </div>
             <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Investment</span>
              <span className="font-semibold">{fmt(initialInvestment)}</span>
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
        <h2 className="text-2xl font-bold mb-4">About ROI Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>An ROI calculator measures the profitability of an investment as a percentage.</li>
          <li>Enter the initial investment and the final value to determine your return on investment.</li>
          <li>The calculator clearly shows the net profit or loss from your investment.</li>
          <li>It is a fundamental tool for investors to assess the performance of their assets.</li>
          <li>Compare the ROI of different investments to make informed financial decisions.</li>
          <li>The result is color-coded to instantly indicate a profit (green) or a loss (red).</li>
          <li>This calculator helps you quantify the success of your investment strategy.</li>
          <li>It is a simple yet powerful tool for both novice and experienced investors.</li>
          <li>Our ROI calculator is free, user-friendly, and provides quick and accurate results.</li>
          <li>Gain a clear understanding of your investment performance with this essential calculator.</li>
        </ul>
      </div>
    </CalculatorWrapper>
    </>
  );
}
