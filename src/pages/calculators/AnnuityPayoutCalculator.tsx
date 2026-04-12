
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function AnnuityPayoutCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [interestRate, setInterestRate] = useState('5');
  const [payoutYears, setPayoutYears] = useState('20');
  const [payoutFrequency, setPayoutFrequency] = useState('monthly'); // 'monthly' or 'annually'

  const { payoutAmount, totalPayout, totalInterest } = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseInt(payoutYears, 10);
    const n = payoutFrequency === 'monthly' ? 12 : 1;
    const numPayments = t * n;

    if (P <= 0 || r < 0 || t <= 0) {
        return { payoutAmount: 0, totalPayout: 0, totalInterest: 0 };
    }

    let payment = 0;
    if (r > 0) {
        const ratePerPeriod = r / n;
        payment = P * (ratePerPeriod / (1 - Math.pow(1 + ratePerPeriod, -numPayments)));
    } else {
        // If interest rate is 0
        payment = P / numPayments;
    }

    const totalReceived = payment * numPayments;
    const interestEarned = totalReceived - P;

    return {
        payoutAmount: payment,
        totalPayout: totalReceived,
        totalInterest: interestEarned,
    };
  }, [principal, interestRate, payoutYears, payoutFrequency]);

  return (
    <>
      <Helmet>
        <title>Annuity Payout Calculator</title>
        <meta name="description" content="Calculate the regular payout from an annuity investment. Determine your periodic withdrawal amount based on your principal, interest rate, and payout term." />
      </Helmet>
      <CalculatorWrapper
        title="Annuity Payout Calculator"
        description="Estimate the periodic payments you'll receive from an annuity."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Annuity Principal ($)</label>
              <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payout Period (Years)</label>
              <input type="number" value={payoutYears} onChange={e => setPayoutYears(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Payout Frequency</label>
              <select value={payoutFrequency} onChange={e => setPayoutFrequency(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold text-center text-gray-800">Your {payoutFrequency.charAt(0).toUpperCase() + payoutFrequency.slice(1)} Payout</h2>
                <p className="text-4xl text-center font-extrabold text-brand-primary">${payoutAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
             <div className="border-t my-2 pt-4 space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Total Payouts</span>
                    <span className="font-bold">${totalPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest Earned</span>
                    <span className="font-bold text-green-600">${totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About This Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An annuity payout calculator helps you determine the regular income you can receive from a lump-sum investment.</li>
            <li>Enter the principal amount of your annuity, the expected annual interest rate, and the number of years you want to receive payments.</li>
            <li>Choose whether you want to receive payments monthly or annually.</li>
            <li>The calculator will show you the fixed payout amount you will receive for each period.</li>
            <li>It also calculates the total amount of payouts you will receive over the life of the annuity and the total interest earned.</li>
            <li>This tool is essential for retirement planning, allowing you to see how a lump sum can be converted into a steady stream of income.</li>
            <li>Annuities can provide a reliable income source during retirement, complementing other sources like Social Security or pensions.</li>
            <li>By adjusting the inputs, you can explore different scenarios to find a payout plan that meets your financial needs.</li>
            <li>Understanding your potential annuity payouts is crucial for making informed decisions about your retirement funds.</li>
            <li>This calculator provides clear, straightforward estimates to help you plan for a secure financial future.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
