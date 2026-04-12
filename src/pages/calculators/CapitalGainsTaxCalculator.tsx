
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function CapitalGainsTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('10000');
  const [salePrice, setSalePrice] = useState('15000');
  const [holdingPeriod, setHoldingPeriod] = useState('long'); // 'short' or 'long'
  const [income, setIncome] = useState('50000'); // For long-term gains

  const { capitalGain, taxRate, taxAmount } = useMemo(() => {
    const gain = parseFloat(salePrice) - parseFloat(purchasePrice);
    if (gain <= 0) return { capitalGain: gain, taxRate: 0, taxAmount: 0 };

    let rate = 0;
    if (holdingPeriod === 'short') {
        // Approximation - uses ordinary income tax brackets. This is a simplification.
        const inc = parseFloat(income);
        if(inc <= 11000) rate = 0.10;
        else if (inc <= 44725) rate = 0.12;
        else if (inc <= 95375) rate = 0.22;
        else if (inc <= 182100) rate = 0.24;
        else if (inc <= 231250) rate = 0.32;
        else if (inc <= 578125) rate = 0.35;
        else rate = 0.37;
    } else { // long-term
      const inc = parseFloat(income);
      if (inc <= 44625) rate = 0;
      else if (inc <= 492300) rate = 0.15;
      else rate = 0.20;
    }

    return {
      capitalGain: gain,
      taxRate: rate * 100,
      taxAmount: gain * rate,
    };
  }, [purchasePrice, salePrice, holdingPeriod, income]);

  return (
    <>
      <Helmet>
        <title>Capital Gains Tax Calculator</title>
        <meta name="description" content="Estimate the capital gains tax on your investments. Calculate the tax for both short-term and long-term gains based on your income." />
      </Helmet>
      <CalculatorWrapper
        title="Capital Gains Tax Calculator"
        description="Estimate the tax on the profit from selling an asset."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Asset Purchase Price ($)</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Asset Sale Price ($)</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Holding Period</label>
              <select value={holdingPeriod} onChange={(e) => setHoldingPeriod(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                <option value="long">Long-Term (Over 1 year)</option>
                <option value="short">Short-Term (1 year or less)</option>
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Your Annual Taxable Income ($)</label>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                <p className="text-xs text-gray-500 mt-1">Your income affects your tax rate.</p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Tax Estimation</h2>
            <div className="flex justify-between">
              <span className="text-gray-600">Capital Gain</span>
              <span className="font-bold">${capitalGain.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Tax Rate</span>
              <span className="font-bold">{taxRate.toFixed(1)}%</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between text-xl">
              <span className="font-semibold text-gray-700">Estimated Tax Owed</span>
              <span className="font-extrabold text-brand-primary">${taxAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>

         <div className="mt-10 text-gray-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Capital Gains Tax</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Capital gains tax is a tax on the profit (gain) you make from selling an asset that has increased in value.</li>
                <li>The tax rate you pay depends on how long you held the asset before selling it.</li>
                <li><strong>Short-Term Capital Gains:</strong> If you hold an asset for one year or less, the profits are typically taxed at your ordinary income tax rate.</li>
                <li><strong>Long-Term Capital Gains:</strong> If you hold an asset for more than one year, the gains are taxed at lower, more favorable rates (0%, 15%, or 20% in the U.S., depending on your taxable income).</li>
                <li>This calculator helps you estimate your potential capital gains tax by providing the purchase price, sale price, holding period, and your annual income.</li>
                <li>Understanding capital gains tax is crucial for investors in stocks, real estate, and other assets.</li>
                <li>By planning your investments and holding periods, you can potentially reduce your tax liability.</li>
                <li>The calculator provides an estimated tax amount, which can be useful for financial planning and budgeting.</li>
                <li>This tool is for informational purposes only and does not constitute tax advice.</li>
                <li>Tax laws are complex and can change, so it's always recommended to consult with a qualified tax professional for personalized advice.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500"><strong>Disclaimer:</strong> This calculator provides an estimate for informational purposes only. It does not constitute tax advice. Tax laws are complex and change frequently. Consult with a qualified tax professional for advice tailored to your specific situation.</p>
        </div>
      </CalculatorWrapper>
    </>
  );
}
