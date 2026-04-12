
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function BMRCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [bmr, setBmr] = useState(0);

  useEffect(() => {
    let bmrValue = 0;
    if (gender === 'male') {
      bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(bmrValue);
  }, [gender, age, height, weight]);

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("BMR Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Gender', gender],
        ['Age (years)', `${age}`],
        ['Height (cm)', `${height} cm`],
        ['Weight (kg)', `${weight} kg`],
        ['BMR (calories/day)', bmr.toFixed(2)],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('bmr-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>BMR Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) with FinovaCalc's free BMR calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/bmr-calculator" />
        <meta name="keywords" content="BMR calculator, basal metabolic rate calculator, metabolism calculator" />
      </Helmet>
      <CalculatorWrapper
        title="BMR Calculator"
        description="Calculate your Basal Metabolic Rate (BMR)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Gender:</label>
              <div className="flex items-center gap-2">
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Age (years): {age}
              </label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Height (cm): {height}
              </label>
              <input
                type="range"
                min="100"
                max="250"
                step="1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Weight (kg): {weight}
              </label>
              <input
                type="range"
                min="30"
                max="200"
                step="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Your BMR</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{bmr.toFixed(2)}</p>
              <p className="text-sm text-gray-500">calories/day</p>
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
          <h2 className="text-2xl font-bold mb-4">About the BMR Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A BMR calculator estimates your Basal Metabolic Rate, which is the amount of energy your body burns at rest.</li>
            <li>To get your BMR, you need to provide your gender, age, height, and weight.</li>
            <li>The calculator uses the Mifflin-St Jeor equation, which is considered more accurate than other formulas.</li>
            <li>Your BMR represents the minimum number of calories your body needs to perform basic functions like breathing, circulation, and cell production.</li>
            <li>Knowing your BMR can be a starting point for determining your daily calorie needs to maintain, lose, or gain weight.</li>
            <li>This calculator is a helpful tool for anyone interested in managing their weight or optimizing their diet.</li>
            <li>It is important to note that this is an estimation, and individual metabolic rates may vary.</li>
            <li>For a more detailed analysis of your nutritional needs, it is best to consult with a healthcare provider or a registered dietitian.</li>
            <li>The interactive sliders allow you to easily adjust the inputs and see how they influence your BMR.</li>
            <li>You can download your BMR results as a PDF to keep for your records or to discuss with a health professional.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
