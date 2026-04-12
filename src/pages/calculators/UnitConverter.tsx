
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const conversions = {
    Length: {
        Meter: 1,
        Kilometer: 0.001,
        Centimeter: 100,
        Millimeter: 1000,
        Mile: 0.000621371,
        Yard: 1.09361,
        Foot: 3.28084,
        Inch: 39.3701,
    },
    Mass: {
        Gram: 1,
        Kilogram: 0.001,
        Milligram: 1000,
        Pound: 0.00220462,
        Ounce: 0.035274,
    },
    Temperature: {
        Celsius: (c) => c,
        Fahrenheit: (c) => (c * 9/5) + 32,
        Kelvin: (c) => c + 273.15,
    },
};

export function UnitConverter() {
    const [category, setCategory] = useState('Length');
    const [fromUnit, setFromUnit] = useState('Meter');
    const [toUnit, setToUnit] = useState('Kilometer');
    const [value, setValue] = useState(1);
    const [result, setResult] = useState(0.001);

    const handleConvert = () => {
        let convertedResult;
        if (category === 'Temperature') {
            const toCelsius = (val, from) => {
                if (from === 'Fahrenheit') return (val - 32) * 5/9;
                if (from === 'Kelvin') return val - 273.15;
                return val;
            }
            const celsiusValue = toCelsius(value, fromUnit);
            convertedResult = conversions.Temperature[toUnit](celsiusValue);
        } else {
            const inMeters = value / conversions[category][fromUnit];
            convertedResult = inMeters * conversions[category][toUnit];
        }
        setResult(convertedResult);
    };

    const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Unit Converter Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Category', category],
        ['From Unit', fromUnit],
        ['To Unit', toUnit],
        ['Value', value.toString()],
        ['Result', result.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('unit-converter-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Unit Converter - FinovaCalc</title>
        <meta name="description" content="Convert between different units of measurement with FinovaCalc's free unit converter." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/unit-converter" />
        <meta name="keywords" content="unit converter, measurement converter, length converter, mass converter, temperature converter" />
      </Helmet>
      <CalculatorWrapper
        title="Unit Converter"
        description="Convert between different units of measurement."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <select onChange={(e) => setCategory(e.target.value)} value={category} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6">
                {Object.keys(conversions).map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="flex gap-4">
                <select onChange={(e) => setFromUnit(e.target.value)} value={fromUnit} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6">
                    {Object.keys(conversions[category]).map(u => <option key={u}>{u}</option>)}
                </select>
                <select onChange={(e) => setToUnit(e.target.value)} value={toUnit} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6">
                    {Object.keys(conversions[category]).map(u => <option key={u}>{u}</option>)}
                </select>
            </div>
            <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"/>
            <button onClick={handleConvert} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark w-full">Convert</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Result</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{result.toFixed(5)}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Unit Converter</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A unit converter allows you to convert between different units of measurement for various quantities like length, mass, and temperature.</li>
            <li>Select a category, the units to convert between, enter a value, and see the result.</li>
            <li>This tool is useful for students, engineers, and anyone needing to work with different measurement systems.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
