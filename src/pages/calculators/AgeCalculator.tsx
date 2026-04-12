
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);

      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setAge({ years, months, days });
    }
  }, [birthDate]);

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Age Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Birth Date', birthDate],
        ['Age', `${age.years} years, ${age.months} months, ${age.days} days`],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('age-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Age Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your age in years, months, and days with FinovaCalc's free age calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/age-calculator" />
        <meta name="keywords" content="age calculator, birthday calculator, date of birth calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Age Calculator"
        description="Calculate your age in years, months, and days."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Your Age</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{`${age.years}y ${age.months}m ${age.days}d`}</p>
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
          <h2 className="text-2xl font-bold mb-4">About the Age Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An age calculator is a convenient tool for determining your exact age in years, months, and days.</li>
            <li>Simply enter your date of birth, and the calculator will instantly compute your age based on the current date.</li>
            <li>This tool is useful for a variety of purposes, from filling out forms to satisfying your own curiosity.</li>
            <li>The calculator accurately accounts for leap years, ensuring a precise age calculation.</li>
            <li>You can also use it to find out the age of historical figures or to calculate the time between two important dates.</li>
            <li>The age is displayed in a clear and easy-to-read format, showing the breakdown of years, months, and days.</li>
            <li>It's a fun tool to use on birthdays or anniversaries to see the exact time that has passed.</li>
            <li>This calculator can be helpful for parents who want to track their child's age in detail.</li>
            <li>The PDF download option allows you to keep a record of the calculated age for future reference.</li>
            <li>Enjoy the simplicity and accuracy of this age calculator for all your age-related calculations.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
