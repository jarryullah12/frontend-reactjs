
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function PercentageCalculator() {
    const [percentage, setPercentage] = useState(10);
    const [total, setTotal] = useState(100);
    const [result, setResult] = useState(10);

    const calculatePercentage = (newPercentage, newTotal) => {
        const res = (newPercentage / 100) * newTotal;
        setResult(res);
    }

    const handlePercentageChange = (e) => {
        const newPercentage = Number(e.target.value);
        setPercentage(newPercentage);
        calculatePercentage(newPercentage, total);
    }

    const handleTotalChange = (e) => {
        const newTotal = Number(e.target.value);
        setTotal(newTotal);
        calculatePercentage(percentage, newTotal);
    }

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Percentage Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Percentage (%)', `${percentage}%`],
        ['Total', total.toString()],
        ['Result', result.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('percentage-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Percentage Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate percentages easily with FinovaCalc's free percentage calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/percentage-calculator" />
        <meta name="keywords" content="percentage calculator, percent calculator, online percentage calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Percentage Calculator"
        description="Calculate percentages with ease."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Percentage (%): {percentage}</label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={percentage}
                onChange={handlePercentageChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Of: {total}</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="10"
                value={total}
                onChange={handleTotalChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Result</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{result}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Percentage Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A percentage calculator helps you find a percentage of a number.</li>
            <li>Enter the percentage and the total amount to calculate the result.</li>
            <li>This tool is useful for a wide range of applications, from calculating discounts to academic grading.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
