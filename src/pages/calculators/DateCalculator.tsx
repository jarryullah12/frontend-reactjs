
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function DateCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const calculateDate = () => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    setEndDate(date.toISOString().slice(0, 10));
  };

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Date Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Start Date', startDate],
        ['Add Years', years.toString()],
        ['Add Months', months.toString()],
        ['Add Days', days.toString()],
        ['End Date', endDate],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('date-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Date Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate a future date by adding or subtracting days, months, and years from a start date with FinovaCalc's free date calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/date-calculator" />
        <meta name="keywords" content="date calculator, time calculator, date plus days, date minus days" />
      </Helmet>
      <CalculatorWrapper
        title="Date Calculator"
        description="Add or subtract days, months, and years from a date."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Years</label>
                <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Months</label>
                <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Days</label>
                <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <button onClick={calculateDate} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark w-full">Calculate</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Resulting Date</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{endDate}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Date Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A date calculator helps you determine a future or past date by adding or subtracting a specific duration.</li>
            <li>Enter a start date and the number of years, months, and days to add or subtract.</li>
            <li>This tool is useful for planning events, tracking deadlines, and calculating time-sensitive information.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
