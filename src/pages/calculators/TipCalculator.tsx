
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState(100);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  useEffect(() => {
    const tip = billAmount * (tipPercentage / 100);
    const total = billAmount + tip;
    const perPerson = total / numberOfPeople;

    setTipAmount(tip);
    setTotalAmount(total);
    setAmountPerPerson(perPerson);
  }, [billAmount, tipPercentage, numberOfPeople]);

  const fmt = (v: number) => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Tip Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Bill Amount', fmt(billAmount)],
        ['Tip Percentage (%)', `${tipPercentage}%`],
        ['Number of People', numberOfPeople.toString()],
        ['Tip Amount', fmt(tipAmount)],
        ['Total Amount', fmt(totalAmount)],
        ['Amount per Person', fmt(amountPerPerson)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('tip-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Tip Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate the tip for your bill quickly and easily with FinovaCalc's free tip calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/tip-calculator" />
        <meta name="keywords" content="tip calculator, gratuity calculator, bill splitting calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Tip Calculator"
        description="Calculate the tip and split the bill among friends."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Bill Amount: {fmt(billAmount)}
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                step="1"
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tip Percentage (%): {tipPercentage}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Number of People: {numberOfPeople}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Tip Amount</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(tipAmount)}</p>
            </div>
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Total Amount</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(totalAmount)}</p>
            </div>
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Amount per Person</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(amountPerPerson)}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Tip Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A tip calculator helps you calculate the tip amount for a bill.</li>
            <li>Enter the bill amount and the tip percentage to calculate the tip.</li>
            <li>You can also split the bill among multiple people.</li>
            <li>This tool is useful for dining out and other situations where a tip is expected.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
