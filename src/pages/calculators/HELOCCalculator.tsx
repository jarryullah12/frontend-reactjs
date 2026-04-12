
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function HELOCCalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTerm, setLoanTerm] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculate = () => {
    const principal = loanAmount;
    const rate = interestRate / 100 / 12;
    const term = loanTerm * 12;
    const monthly = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    setMonthlyPayment(monthly);
  };

  return (
    <>
      <Helmet>
        <title>HELOC Calculator</title>
        <meta name="description" content="Calculate payments for a Home Equity Line of Credit." />
      </Helmet>
      <CalculatorWrapper
        title="HELOC Calculator"
        description="Calculate the monthly payment for a Home Equity Line of Credit (HELOC)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Term (Years)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
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
              <h3 className="text-lg font-medium text-gray-500">Monthly Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{monthlyPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CalculatorWrapper>
    </>
  );
}
