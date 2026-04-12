
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function PaybackPeriodCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [annualCashFlow, setAnnualCashFlow] = useState('2500');

  const paybackPeriod = useMemo(() => {
    const investment = parseFloat(initialInvestment);
    const cashFlow = parseFloat(annualCashFlow);
    if (investment > 0 && cashFlow > 0) {
      return investment / cashFlow;
    }
    return 0;
  }, [initialInvestment, annualCashFlow]);

  const chartData = useMemo(() => {
    const investment = parseFloat(initialInvestment);
    const cashFlow = parseFloat(annualCashFlow);
    if (investment <= 0 || cashFlow <= 0) return [];

    const period = Math.ceil(paybackPeriod);
    const data = [];
    for (let i = 0; i <= period + 2; i++) {
      data.push({
        year: i,
        cumulativeCashFlow: Math.min(i * cashFlow, investment),
        remainingInvestment: Math.max(investment - i * cashFlow, 0),
      });
    }
    return data;
  }, [initialInvestment, annualCashFlow, paybackPeriod]);

  return (
    <>
      <Helmet>
        <title>Payback Period Calculator</title>
        <meta name="description" content="Calculate the payback period for an investment to determine its profitability and the time it will take to recover the initial cost." />
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payback Period Calculator</h1>
        <p className="text-gray-600 mb-6">Determine how long it takes for an investment to pay for itself.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label>
              <input
                type="number"
                id="initialInvestment"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                placeholder="e.g., 10000"
              />
            </div>
            <div>
              <label htmlFor="annualCashFlow" className="block text-sm font-medium text-gray-700 mb-1">Annual Cash Flow ($)</label>
              <input
                type="number"
                id="annualCashFlow"
                value={annualCashFlow}
                onChange={(e) => setAnnualCashFlow(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                placeholder="e.g., 2500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Payback Period:</p>
                <p className="text-2xl font-bold text-brand-primary">{paybackPeriod.toFixed(2)} years</p>
              </div>
              <p className="text-sm text-gray-500 text-center">This is the time required for the cumulative cash inflows to equal the initial investment.</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Recovery Over Time</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="remainingInvestment" name="Remaining Investment" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="cumulativeCashFlow" name="Cumulative Cash Flow" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )}

        {/* About Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Payback Period Calculator</h2>
          <div className="space-y-4 text-gray-600">
            <p>The payback period is a simple and widely used metric in capital budgeting to evaluate the risk associated with an investment.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>It calculates the number of years it takes for a project's cash inflows to cover the initial investment.</li>
              <li>A shorter payback period is generally preferred as it indicates lower risk and faster recovery of funds.</li>
              <li>This calculator assumes that cash flows are even and occur annually. For projects with uneven cash flows, a more detailed calculation is required.</li>
              <li>While useful, the payback period does not account for the time value of money or cash flows that occur after the payback period.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
