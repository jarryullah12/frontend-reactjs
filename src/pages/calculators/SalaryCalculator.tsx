
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [payFrequency, setPayFrequency] = useState('monthly');
  const [hourlyRate, setHourlyRate] = useState(0);
  const [weeklyRate, setWeeklyRate] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);

  useEffect(() => {
    const weeksInYear = 52;
    const hoursInWeek = 40;
    const monthsInYear = 12;
    
    let hourly = 0, weekly = 0, monthly = 0;

    if (payFrequency === 'annually') {
      hourly = annualSalary / weeksInYear / hoursInWeek;
      weekly = annualSalary / weeksInYear;
      monthly = annualSalary / monthsInYear;
    } else if (payFrequency === 'monthly') {
      const annual = annualSalary * monthsInYear;
      hourly = annual / weeksInYear / hoursInWeek;
      weekly = annual / weeksInYear;
      monthly = annualSalary;
    } else if (payFrequency === 'weekly') {
        const annual = annualSalary * weeksInYear;
        hourly = annualSalary / hoursInWeek;
        weekly = annualSalary;
        monthly = annual * monthsInYear;
    } else if (payFrequency === 'hourly') {
        const annual = annualSalary * hoursInWeek * weeksInYear;
        hourly = annualSalary;
        weekly = annualSalary * hoursInWeek;
        monthly = annual / monthsInYear;
    }

    setHourlyRate(hourly);
    setWeeklyRate(weekly);
    setMonthlyRate(monthly);

  }, [annualSalary, payFrequency]);

  const fmt = (v: number) => `$${v.toFixed(2).toLocaleString()}`;

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Salary Calculator Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Pay Frequency', 'Amount']],
      body: [
        ['Annual Salary', fmt(payFrequency === 'annually' ? annualSalary : (payFrequency === 'monthly' ? annualSalary*12 : (payFrequency === 'weekly' ? annualSalary*52 : annualSalary*40*52)))],
        ['Monthly Pay', fmt(monthlyRate)],
        ['Weekly Pay', fmt(weeklyRate)],
        ['Hourly Rate', fmt(hourlyRate)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('salary-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Salary Calculator - FinovaCalc</title>
        <meta name="description" content="Convert your salary between annual, monthly, weekly, and hourly rates with FinovaCalc's free salary calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/salary-calculator" />
        <meta name="keywords" content="salary calculator, hourly to salary calculator, salary conversion calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Salary Calculator"
        description="Convert your salary between annual, monthly, weekly, and hourly rates."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Pay Frequency
                </label>
                <select
                    value={payFrequency}
                    onChange={(e) => setPayFrequency(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                >
                    <option value="annually">Annually</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="hourly">Hourly</option>
                </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
                <h3 className="text-lg font-medium text-gray-500">Salary Breakdown</h3>
            </div>
            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Hourly Rate</span>
                <span className="font-semibold">{fmt(hourlyRate)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Weekly Pay</span>
                <span className="font-semibold">{fmt(weeklyRate)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Monthly Pay</span>
                <span className="font-semibold">{fmt(monthlyRate)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Annual Salary</span>
                <span className="font-semibold">{fmt(payFrequency === 'annually' ? annualSalary : (payFrequency === 'monthly' ? annualSalary*12 : (payFrequency === 'weekly' ? annualSalary*52 : annualSalary*40*52)))}</span>
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
          <h2 className="text-2xl font-bold mb-4">About Salary Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A salary calculator helps you convert your income between different pay frequencies.</li>
            <li>Enter your income and select whether it is paid annually, monthly, weekly, or hourly.</li>
            <li>The calculator will show you your equivalent income in the other pay frequencies.</li>
            <li>This tool is useful for comparing job offers with different pay structures.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
