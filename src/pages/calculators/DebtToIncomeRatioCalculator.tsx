
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function DebtToIncomeRatioCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [mortgagePayment, setMortgagePayment] = useState('1500');
  const [carPayment, setCarPayment] = useState('300');
  const [studentLoan, setStudentLoan] = useState('200');
  const [creditCardMinimum, setCreditCardMinimum] = useState('100');
  const [otherDebt, setOtherDebt] = useState('0');

  const { totalDebt, dtiRatio, rating } = useMemo(() => {
    const income = parseFloat(monthlyIncome);
    const debt = parseFloat(mortgagePayment) + parseFloat(carPayment) + parseFloat(studentLoan) + parseFloat(creditCardMinimum) + parseFloat(otherDebt);
    
    if (income === 0) return { totalDebt: debt, dtiRatio: Infinity, rating: 'N/A' };
    
    const ratio = (debt / income) * 100;
    
    let dtiRating = '';
    if (ratio <= 36) {
        dtiRating = 'Excellent';
    } else if (ratio <= 43) {
        dtiRating = 'Good';
    } else if (ratio <= 50) {
        dtiRating = 'Fair';
    } else {
        dtiRating = 'High Risk';
    }

    return {
      totalDebt: debt,
      dtiRatio: ratio,
      rating: dtiRating,
    };
  }, [monthlyIncome, mortgagePayment, carPayment, studentLoan, creditCardMinimum, otherDebt]);

  return (
    <>
      <Helmet>
        <title>Debt-to-Income (DTI) Ratio Calculator</title>
        <meta name="description" content="Calculate your debt-to-income ratio (DTI) to assess your financial health. Understand how lenders view your borrowing capacity." />
      </Helmet>
      <CalculatorWrapper
        title="Debt-to-Income (DTI) Ratio Calculator"
        description="Assess your financial health by calculating your DTI ratio."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gross Monthly Income ($)</label>
              <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <h3 className="text-lg font-semibold pt-4">Monthly Debt Payments</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mortgage or Rent Payment ($)</label>
              <input type="number" value={mortgagePayment} onChange={(e) => setMortgagePayment(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Car Loan Payment ($)</label>
              <input type="number" value={carPayment} onChange={(e) => setCarPayment(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Loan Payment ($)</label>
              <input type="number" value={studentLoan} onChange={(e) => setStudentLoan(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Credit Card Payments ($)</label>
              <input type="number" value={creditCardMinimum} onChange={(e) => setCreditCardMinimum(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Other Monthly Debt Payments ($)</label>
              <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-gray-800">Your DTI Ratio</h2>
            <p className="text-5xl font-extrabold text-brand-primary my-4">{isFinite(dtiRatio) ? dtiRatio.toFixed(2) : 'N/A'}%</p>
            <p className={`text-xl font-semibold ${rating === 'Excellent' ? 'text-green-600' : rating === 'Good' ? 'text-yellow-500' : 'text-red-500'}`}>{rating}</p>
            <div className="w-full mt-6 text-left space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Total Monthly Debt</span>
                    <span className="font-bold">${totalDebt.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-600">Total Monthly Income</span>
                    <span className="font-bold">${parseFloat(monthlyIncome).toLocaleString()}</span>
                </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About the DTI Calculator</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Your debt-to-income (DTI) ratio is a key financial metric that compares your total monthly debt payments to your gross monthly income.</li>
                <li>Lenders use this ratio to assess your ability to manage monthly payments and repay debts.</li>
                <li>A lower DTI ratio indicates a good balance between debt and income and is viewed favorably by lenders.</li>
                <li>A higher DTI ratio can signal that you may have too much debt for your income, which could make it difficult to get approved for a new loan or line of credit.</li>
                <li>To calculate your DTI, you sum up all your monthly debt payments, including rent/mortgage, car loans, student loans, and minimum credit card payments.</li>
                <li>Then, you divide this total by your gross monthly income (your income before taxes and deductions).</li>
                <li>The result is expressed as a percentage. For example, a DTI of 36% means that 36% of your monthly income goes toward debt payments.</li>
                <li>This calculator helps you quickly determine your DTI and provides a rating of your financial standing, from "Excellent" to "High Risk."</li>
                <li>By understanding your DTI, you can make more informed decisions about your finances, such as whether to take on new debt or focus on paying down existing balances.</li>
                <li>Regularly monitoring your DTI is a good practice for maintaining financial health and achieving your long-term financial goals.</li>
            </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
