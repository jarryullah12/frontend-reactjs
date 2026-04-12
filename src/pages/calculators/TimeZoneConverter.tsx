
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function TimeZoneConverter() {
    const [time, setTime] = useState(new Date());
    const [fromTimeZone, setFromTimeZone] = useState("UTC");
    const [toTimeZone, setToTimeZone] = useState("America/New_York");
    const [convertedTime, setConvertedTime] = useState("");

    const timeZones = [
        "UTC",
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Los_Angeles",
        "Europe/London",
        "Europe/Paris",
        "Asia/Tokyo",
        "Asia/Dubai",
        "Australia/Sydney"
    ];

    useEffect(() => {
        try {
            const options = { timeZone: toTimeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const converted = new Intl.DateTimeFormat('en-US', options).format(time);
            setConvertedTime(converted);
        } catch (error) {
            setConvertedTime("Invalid Time Zone");
        }
    }, [time, toTimeZone]);

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Time Zone Converter Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['From Time Zone', fromTimeZone],
        ['To Time Zone', toTimeZone],
        ['Original Time', time.toLocaleTimeString()],
        ['Converted Time', convertedTime],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('time-zone-converter-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Time Zone Converter - FinovaCalc</title>
        <meta name="description" content="Convert time between different time zones with FinovaCalc's free time zone converter." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/time-zone-converter" />
        <meta name="keywords" content="time zone converter, world clock, time conversion" />
      </Helmet>
      <CalculatorWrapper
        title="Time Zone Converter"
        description="Convert time between different time zones."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">From Time Zone</label>
              <select 
                value={fromTimeZone} 
                onChange={(e) => setFromTimeZone(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              >
                {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">To Time Zone</label>
              <select 
                value={toTimeZone} 
                onChange={(e) => setToTimeZone(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              >
                {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Time</label>
                <input 
                    type="time" 
                    defaultValue={time.toTimeString().slice(0,5)} 
                    onChange={(e) => setTime(new Date(`1970-01-01T${e.target.value}:00`))} 
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Converted Time</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{convertedTime}</p>
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
          <h2 className="text-2xl font-bold mb-4">About Time Zone Converter</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A time zone converter helps you find the time in another city or country.</li>
            <li>Select the time zones you want to convert between and the time to see the converted time.</li>
            <li>This tool is useful for scheduling meetings, tracking events, and staying connected with people around the world.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
