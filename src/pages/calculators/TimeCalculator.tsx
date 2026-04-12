
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function TimeCalculator() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const calculateTime = () => {
    const total = (hours * 3600) + (minutes * 60) + seconds;
    setTotalSeconds(total);
  };

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Time Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Hours', hours.toString()],
        ['Minutes', minutes.toString()],
        ['Seconds', seconds.toString()],
        ['Total Seconds', totalSeconds.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('time-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Time Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate the total number of seconds from hours, minutes, and seconds with FinovaCalc's free time calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/time-calculator" />
        <meta name="keywords" content="time calculator, seconds calculator, time to seconds" />
      </Helmet>
      <CalculatorWrapper
        title="Time Calculator"
        description="Convert hours, minutes, and seconds to total seconds."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Hours</label>
                <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Minutes</label>
                <input type="number" value={minutes} onChange={e => setMinutes(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Seconds</label>
                <input type="number" value={seconds} onChange={e => setSeconds(Number(e.target.value))} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <button onClick={calculateTime} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark w-full">Calculate</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Total Seconds</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{totalSeconds}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Time Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A time calculator helps you convert a duration of time into a single unit, such as seconds.</li>
            <li>Enter the hours, minutes, and seconds to find the total number of seconds.</li>
            <li>This tool is useful for various calculations in science, engineering, and everyday life.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
