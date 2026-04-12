
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState(250000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const p = principal;

    const payment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(payment);
  }, [principal, interestRate, loanTerm]);

  return (
    <>
      <Helmet>
        <title>Mortgage Calculator</title>
        <meta name="description" content="Estimate your monthly mortgage payments." />
      </Helmet>
      <CalculatorWrapper
        title="Mortgage Calculator"
        description="Estimate your monthly mortgage payment."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Amount
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 flex flex-col items-center justify-center">
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-medium text-gray-500">Monthly Mortgage Payment</h3>
              <p className="text-4xl font-bold text-brand-primary mt-2">₹{monthlyPayment.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About the Mortgage Calculator</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>A mortgage calculator is an essential tool for anyone considering buying a home.</li>
                <li>It helps you estimate your monthly mortgage payment based on the loan amount, interest rate, and loan term.</li>
                <li>By entering these key variables, you can get a clear picture of what your monthly housing expense will look like.</li>
                <li>The loan amount is the price of the home minus your down payment.</li>
                <li>The interest rate is the annual rate charged by the lender. Even small changes in the interest rate can significantly impact your monthly payment.</li>
                <li>The loan term is the length of time you have to repay the loan, typically 15 or 30 years.</li>
                <li>This calculator uses the standard formula to calculate the principal and interest portion of your monthly payment.</li>
                <li>It's important to remember that this calculation does not include other costs such as property taxes, homeowners' insurance, or private mortgage insurance (PMI), which are often included in a total monthly mortgage payment.</li>
                <li>Using this calculator can help you determine how much house you can afford and experiment with different loan scenarios to find a payment that fits your budget.</li>
                <li>Being well-informed about your potential mortgage payment is a critical step in the home-buying process, and this tool is designed to provide you with the clarity you need.</li>
            </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
