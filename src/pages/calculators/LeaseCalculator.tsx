
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';

export function LeaseCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(3000);
  const [residualValue, setResidualValue] = useState(15000);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalLeaseCost, setTotalLeaseCost] = useState(0);
  const [totalDepreciation, setTotalDepreciation] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capitalizedCost = vehiclePrice - downPayment;
    const depreciation = capitalizedCost - residualValue;
    const depreciationPortion = depreciation / leaseTerm;
    const interestPortion = (capitalizedCost + residualValue) * (interestRate / 100 / 12);
    const monthlyPaymentValue = depreciationPortion + interestPortion;
    const totalLeaseCostValue = monthlyPaymentValue * leaseTerm + downPayment;

    setMonthlyPayment(monthlyPaymentValue);
    setTotalLeaseCost(totalLeaseCostValue);
    setTotalDepreciation(depreciation);
    setTotalInterest(totalLeaseCostValue - depreciation - downPayment);

  }, [vehiclePrice, downPayment, residualValue, leaseTerm, interestRate]);

  const data = [
    { name: 'Depreciation', value: totalDepreciation > 0 ? totalDepreciation : 0 },
    { name: 'Interest', value: totalInterest > 0 ? totalInterest : 0 },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const handleDownload = async () => {
    const chartElement = chartRef.current;
    if (!chartElement) {
      console.error("Chart element not found");
      return;
    }
    
    try {
      const canvas = await html2canvas(chartElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("Lease Calculator Report", 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Vehicle Price', fmt(vehiclePrice)],
          ['Down Payment', fmt(downPayment)],
          ['Residual Value', fmt(residualValue)],
          ['Lease Term (Months)', leaseTerm.toString()],
          ['Interest Rate (%)', interestRate.toString()],
          ['Monthly Lease Payment', fmt(monthlyPayment)],
          ['Total Lease Cost', fmt(totalLeaseCost)],
          ['Total Depreciation', fmt(totalDepreciation)],
          ['Total Interest Paid', fmt(totalInterest)],
        ],
        theme: 'striped',
        headStyles: { fillColor: '#0B3C5D' },
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 120;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      const lastTable = (doc as any).lastAutoTable;
      let imageY = lastTable.finalY + 15;

      if (imageY + imgHeight > doc.internal.pageSize.getHeight() - 15) {
        doc.addPage();
        imageY = 20;
      }
      
      doc.setFontSize(16);
      doc.text("Lease Cost Breakdown", 14, imageY);
      doc.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, imageY + 5, imgWidth, imgHeight);

      doc.save('lease-report.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lease Calculator - FinovaCalc</title>
        <meta name="description" content="Estimate your monthly lease payments with FinovaCalc's free lease calculator. Understand the costs associated with leasing a vehicle." />
        <link rel="canonical" href="https://www.finovacalc.com/calculators/lease-calculator" />
        <meta name="keywords" content="lease calculator, car lease calculator, auto lease calculator, lease payment calculator" />
      </Helmet>
      <CalculatorWrapper
        title="Lease Calculator"
        description="Estimate your monthly lease payments and understand the costs of leasing."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle Price: {fmt(vehiclePrice)}
              </label>
              <input
                type="range"
                min="10000"
                max="100000"
                step="1000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Down Payment: {fmt(downPayment)}
              </label>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Residual Value: {fmt(residualValue)}
              </label>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={residualValue}
                onChange={(e) => setResidualValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Lease Term (Months): {leaseTerm}
              </label>
              <input
                type="range"
                min="12"
                max="60"
                step="1"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%): {interestRate}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Monthly Lease Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(monthlyPayment)}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Lease Cost</span>
                <span className="font-semibold">{fmt(totalLeaseCost)}</span>
              </div>
            </div>

            <div className="h-64 w-full mt-6" ref={chartRef}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => fmt(Number(value))} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
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
          <h2 className="text-2xl font-bold mb-4">About Lease Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A lease calculator helps you estimate the monthly payment for a vehicle lease.</li>
            <li>Enter the vehicle price, down payment, residual value, lease term, and interest rate.</li>
            <li>The calculator will estimate your monthly payment and show you the total cost of the lease.</li>
            <li>This tool is essential for comparing lease offers and understanding the costs involved.</li>
            <li>The pie chart provides a visual breakdown of the depreciation and interest costs.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
