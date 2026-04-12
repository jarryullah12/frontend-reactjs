
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Hardcoded conversion rates (replace with real API call)
  const conversionRates: { [key: string]: number } = {
    USD: 1,
    INR: 83.50,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 157.25,
  };

  useEffect(() => {
    const fromRate = conversionRates[fromCurrency];
    const toRate = conversionRates[toCurrency];
    const converted = (amount / fromRate) * toRate;
    setConvertedAmount(converted);
  }, [amount, fromCurrency, toCurrency]);

  const fmt = (v: number) => `${v.toFixed(2).toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Currency Converter Report", 14, 22);
    let finalY = 0;
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Amount', `${fmt(amount)} ${fromCurrency}`],
        ['Converted Amount', `${fmt(convertedAmount)} ${toCurrency}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
      didDrawPage: (data) => {
          finalY = data.cursor.y;
      }
    });

    doc.save('currency-converter-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Currency Converter - FinovaCalc</title>
        <meta name="description" content="Convert currencies from around the world with FinovaCalc's free currency converter." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/currency-converter" />
        <meta name="keywords" content="currency converter, exchange rate calculator, currency exchange" />
      </Helmet>
      <CalculatorWrapper
        title="Currency Converter"
        description="Convert currencies from around the world."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    From Currency
                </label>
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                >
                    {Object.keys(conversionRates).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    To Currency
                </label>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                >
                    {Object.keys(conversionRates).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Converted Amount</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(convertedAmount)} {toCurrency}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Currency Converter</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A currency converter is a tool that allows you to determine the value of one currency in relation to another.</li>
            <li>To use it, enter the amount of money you want to convert, select the currency you have (From Currency), and the currency you want to get (To Currency).</li>
            <li>The calculator will then show you the equivalent amount in the desired currency based on current exchange rates.</li>
            <li>This tool is invaluable for travelers, international business professionals, and online shoppers who need to understand the cost of items in their local currency.</li>
            <li>The exchange rates used in this calculator are for informational purposes and may not reflect the actual rates offered by your bank or a money exchange service.</li>
            <li>Real-time exchange rates fluctuate constantly, so the converted amount is an estimate.</li>
            <li>This calculator supports a variety of common currencies, making it a versatile tool for many users.</li>
            <li>The interface is designed to be simple and intuitive, providing a quick and easy way to get currency conversions.</li>
            <li>You can download a PDF of the conversion report for your records, which can be useful for expense tracking or business accounting.</li>
            <li>By providing instant conversions, this tool helps you make more informed financial decisions when dealing with foreign currencies.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
