
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function RentalYieldCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [annualYield, setAnnualYield] = useState(0);

  useEffect(() => {
    const annualRent = monthlyRent * 12;
    const yieldValue = (annualRent / propertyPrice) * 100;
    setAnnualYield(yieldValue);
  }, [propertyPrice, monthlyRent]);

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Rental Yield Calculator Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Property Price', fmt(propertyPrice)],
        ['Monthly Rent', fmt(monthlyRent)],
        ['Annual Rental Yield (%)', `${annualYield.toFixed(2)}%`]
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('rental-yield-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Rental Yield Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate the annual rental yield of a property with FinovaCalc's free rental yield calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/rental-yield-calculator" />
        <meta name="keywords" content="rental yield calculator, real estate calculator, investment property calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Rental Yield Calculator"
        description="Calculate the annual rental yield of a property."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Property Price: {fmt(propertyPrice)}
              </label>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Monthly Rent: {fmt(monthlyRent)}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Annual Rental Yield</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{annualYield.toFixed(2)}%</p>
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
          <h2 className="text-2xl font-bold mb-4">About Rental Yield Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A rental yield calculator helps you determine the annual return on a real estate investment property.</li>
            <li>Enter the property price and the expected monthly rent.</li>
            <li>The calculator will show you the annual rental yield as a percentage.</li>
            <li>This tool is essential for real estate investors to assess the profitability of a rental property.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
