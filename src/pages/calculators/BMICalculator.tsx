
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function BMICalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");

  useEffect(() => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  }, [height, weight]);

  const handleDownload = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("BMI Calculator Report", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Description', 'Value']],
      body: [
        ['Height (cm)', `${height} cm`],
        ['Weight (kg)', `${weight} kg`],
        ['BMI', bmi.toFixed(2)],
        ['Category', bmiCategory],
      ],
      theme: 'striped',
      headStyles: { fillColor: '#0B3C5D' },
    });

    doc.save('bmi-calculator-report.pdf');
  };

  return (
    <>
      <Helmet>
        <title>BMI Calculator - FinovaCalc</title>
        <meta name="description" content="Calculate your Body Mass Index (BMI) with FinovaCalc's free BMI calculator." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/bmi-calculator" />
        <meta name="keywords" content="BMI calculator, body mass index calculator, health calculator" />
      </Helmet>
      <CalculatorWrapper
        title="BMI Calculator"
        description="Calculate your Body Mass Index (BMI)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
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
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Your BMI</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{bmi.toFixed(2)}</p>
            </div>
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-gray-500">Category</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-2">{bmiCategory}</p>
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
          <h2 className="text-2xl font-bold mb-4">About the BMI Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A BMI calculator is a simple tool to help you assess your body weight in relation to your height.</li>
            <li>BMI stands for Body Mass Index, which is a widely used indicator of body fatness.</li>
            <li>To calculate your BMI, you need to enter your height in centimeters and your weight in kilograms.</li>
            <li>The calculator will provide you with a BMI value and classify it into one of four categories: Underweight, Normal weight, Overweight, or Obesity.</li>
            <li>This classification can help you understand if your weight is in a healthy range.</li>
            <li>The BMI calculator is a useful screening tool, but it should not be the sole basis for assessing your health.</li>
            <li>Factors like body composition, muscle mass, and age can also influence your overall health.</li>
            <li>It is always recommended to consult with a healthcare professional for a comprehensive health assessment.</li>
            <li>The sliders make it easy to adjust your height and weight, allowing you to see how changes in these values affect your BMI.</li>
            <li>You can download a PDF of your results to share with your doctor or to keep for your personal health records.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
