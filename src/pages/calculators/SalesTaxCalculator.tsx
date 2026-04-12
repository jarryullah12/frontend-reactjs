
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function SalesTaxCalculator() {
  const [preTaxPrice, setPreTaxPrice] = useState(100);
  const [taxRate, setTaxRate] = useState(8);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculate = () => {
    setTotalPrice(preTaxPrice * (1 + taxRate / 100));
  };

  return (
    <>
      <Helmet>
        <title>Sales Tax Calculator</title>
        <meta name="description" content="Calculate the sales tax and total price of an item." />
      </Helmet>
      <CalculatorWrapper
        title="Sales Tax Calculator"
        description="Calculate the sales tax and total price of an item based on the pre-tax price and tax rate."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Pre-Tax Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={preTaxPrice}
                  onChange={(e) => setPreTaxPrice(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tax Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={calculate}
                className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark"
              >
                Calculate
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Total Price</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
