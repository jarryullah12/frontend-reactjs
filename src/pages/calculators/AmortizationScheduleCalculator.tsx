
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalculatorWrapper } from '../../components/CalculatorWrapper';

export function AmortizationScheduleCalculator() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('30');

  const { monthlyPayment, schedule } = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    if (principal <= 0 || rate <= 0 || term <= 0) return { monthlyPayment: 0, schedule: [] };

    const payment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    let balance = principal;
    const amortizationSchedule = [];
    for (let i = 1; i <= term; i++) {
        const interestPayment = balance * rate;
        const principalPayment = payment - interestPayment;
        balance -= principalPayment;
        amortizationSchedule.push({
            month: i,
            interest: interestPayment,
            principal: principalPayment,
            balance: balance > 0 ? balance : 0,
        });
    }

    return { monthlyPayment: payment, schedule: amortizationSchedule };
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <>
      <Helmet>
        <title>Amortization Schedule Calculator</title>
        <meta name="description" content="Generate a detailed loan amortization schedule. See a breakdown of each payment into principal and interest over the life of your loan." />
      </Helmet>
      <CalculatorWrapper
        title="Amortization Schedule Calculator"
        description="See a detailed payment-by-payment breakdown of your loan."
      >
        {/* Inputs & Summary */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
                    <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                    <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
                    <input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
                </div>
            </div>
            <div className="md:col-span-2 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Monthly Payment</h2>
                    <p className="text-4xl font-extrabold text-brand-primary">${monthlyPayment.toFixed(2)}</p>
                </div>
            </div>
        </div>

        {/* Amortization Table */}
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amortization Schedule</h2>
            <div className="overflow-auto border border-gray-200 rounded-lg" style={{maxHeight: '500px'}}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule.map((row) => (
                            <tr key={row.month}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.month}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{row.principal.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{row.interest.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About the Amortization Schedule Calculator</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>An amortization schedule calculator provides a detailed breakdown of your loan payments over time.</li>
            <li>It shows you how much of each payment goes toward the principal loan amount and how much is paid in interest.</li>
            <li>To use the calculator, enter your total loan amount, annual interest rate, and the term of the loan in years.</li>
            <li>The calculator will generate a table that lists each payment, showing the principal and interest portions, and the remaining loan balance after each payment.</li>
            <li>This tool is incredibly useful for understanding the true cost of a loan and how your payments are working to reduce your debt.</li>
            <li>You can see how the interest portion of your payment decreases over time, while the principal portion increases.</li>
            <li>This calculator is suitable for various types of loans, including mortgages, auto loans, and personal loans.</li>
            <li>By visualizing the amortization schedule, you can make informed decisions, such as whether to make extra payments to pay off the loan faster and save on interest.</li>
            <li>The monthly payment amount is calculated based on a fixed interest rate, so your payment remains consistent throughout the loan term.</li>
            <li>Use this tool to gain a clearer understanding of your financial obligations and to plan your long-term borrowing strategy effectively.</li>
          </ul>
        </div>
      </CalculatorWrapper>
    </>
  );
}
