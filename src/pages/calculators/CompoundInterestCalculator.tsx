import { useState, useEffect } from 'react';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1);
  const [amount, setAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);

  useEffect(() => {
    const r = rate / 100;
    const n = frequency;
    const t = years;
    const a = principal * Math.pow(1 + r / n, n * t);

    setAmount(Math.round(a));
    setInterestEarned(Math.round(a - principal));
  }, [principal, rate, years, frequency]);

  const data = [
    { name: 'Principal Amount', value: principal },
    { name: 'Total Interest', value: interestEarned },
  ];

  const COLORS = ['#0B3C5D', '#D9B310'];

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  const frequencyMap: { [key: number]: string } = {
    1: 'Annually',
    2: 'Semi-Annually',
    4: 'Quarterly',
    12: 'Monthly',
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Compound Interest Calculator Report", 20, 10);
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Principal Amount', fmt(principal)],
        ['Interest Rate (%)', rate],
        ['Time Period (Years)', years],
        ['Compounding Frequency', frequencyMap[frequency]],
        ['Maturity Amount', fmt(amount)],
        ['Interest Earned', fmt(interestEarned)],
      ],
    });
    doc.save('compound-interest-report.pdf');
  };

  return (
    <CalculatorWrapper
      title="Compound Interest Calculator"
      description="Calculate the future value of your investment with compound interest."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Principal Amount: {fmt(principal)}
            </label>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Interest Rate (%): {rate}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Time Period (Years): {years}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
             <div className="mt-2">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6"
            >
              <option value={1}>Annually</option>
              <option value={2}>Semi-Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-center w-full mb-6">
            <h3 className="text-lg font-medium text-gray-500">Maturity Amount</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">{fmt(amount)}</p>
          </div>

          <div className="w-full space-y-4">
             <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-semibold">{fmt(principal)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Interest Earned</span>
              <span className="font-semibold text-brand-accent">{fmt(interestEarned)}</span>
            </div>
          </div>

          <div className="h-64 w-full mt-6">
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
                <Legend verticalAlign="bottom" height={36}/>
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
        <h2 className="text-2xl font-bold mb-4">About Compound Interest Calculator</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>A compound interest calculator helps you understand the power of compounding on your investments.</li>
          <li>Enter the principal amount, interest rate, tenure, and compounding frequency to see your investment grow.</li>
          <li>The calculator shows the total maturity amount and the interest earned over the investment period.</li>
          <li>It's a great tool for planning your long-term financial goals, such as retirement or a child's education.</li>
          <li>You can see how different compounding frequencies (monthly, quarterly, annually) affect your returns.</li>
          <li>The pie chart visualizes the proportion of the principal amount to the total interest earned.</li>
          <li>Adjust the tenure to see how the power of compounding accelerates your wealth over time.</li>
          <li>This calculator is essential for anyone looking to make informed investment decisions.</li>
          <li>Our tool is free, easy to use, and provides accurate calculations to help you plan your future.</li>
          <li>Make the most of your investments by understanding and leveraging the magic of compound interest.</li>
        </ul>
      </div>
    </CalculatorWrapper>
  );
}
