<<<<<<< HEAD

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
=======
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollReveal } from '../hooks/useScrollReveal';
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
import {
  Calculator,
  DollarSign,
  Home,
  Car,
  Briefcase,
  GitCompare,
  TrendingUp,
  PieChart,
  BarChart,
  PiggyBank,
  ChevronRight,
  Zap,
  BookOpen,
<<<<<<< HEAD
  Search
} from 'lucide-react';
import { calculators } from '../data/calculators';
import { useState, useMemo } from 'react';

export function CalculatorsList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalculators = useMemo(() =>
    calculators.filter(calc =>
      calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const categories = [...new Set(filteredCalculators.map(c => c.category))];
=======
} from 'lucide-react';

export function CalculatorsList() {
  useScrollReveal();

  const calculators = [
    {
      name: 'EMI Calculator',
      path: '/calculators/emi',
      icon: Calculator,
      description: 'Calculate your Equal Monthly Installment (EMI) for any loan. Get a detailed breakdown of principal and interest components with visual pie charts.',
      category: 'Loan Calculators',
      tag: 'Most Popular',
    },
    {
      name: 'Personal Loan Calculator',
      path: '/calculators/personal-loan',
      icon: DollarSign,
      description: 'Plan your personal loan repayments with ease. See your monthly EMI, total interest payable, and total repayment amount at a glance.',
      category: 'Loan Calculators',
      tag: 'Quick & Easy',
    },
    {
      name: 'Mortgage Calculator',
      path: '/calculators/mortgage',
      icon: Home,
      description: 'Estimate your monthly mortgage payments including principal, interest, and down payment. Perfect for first-time homebuyers and refinancers.',
      category: 'Loan Calculators',
      tag: 'Home Buyers',
    },
    {
      name: 'Car Loan Calculator',
      path: '/calculators/car-loan',
      icon: Car,
      description: 'Find out exactly how much your dream car will cost you each month. Factor in down payment, interest rate, and loan tenure for accurate results.',
      category: 'Loan Calculators',
      tag: 'Auto Loans',
    },
    {
      name: 'Home Loan Eligibility',
      path: '/calculators/home-loan-eligibility',
      icon: Briefcase,
      description: 'Check your maximum home loan eligibility based on your monthly income and existing financial obligations. Know your borrowing power before you apply.',
      category: 'Loan Calculators',
      tag: 'Eligibility Check',
    },
    {
      name: 'Loan Comparison',
      path: '/calculators/loan-comparison',
      icon: GitCompare,
      description: 'Compare two different loan offers side by side with visual bar charts. See which option saves you more money on interest over the loan tenure.',
      category: 'Loan Calculators',
      tag: 'Smart Compare',
    },
    {
      name: 'Compound Interest',
      path: '/calculators/compound-interest',
      icon: TrendingUp,
      description: 'Discover the power of compound interest on your investments. Choose from annual, semi-annual, quarterly, or monthly compounding frequencies.',
      category: 'Investment & Savings',
      tag: 'Investing',
    },
    {
      name: 'Retirement Planning',
      path: '/calculators/retirement',
      icon: PieChart,
      description: 'Plan for a secure retirement by estimating your future corpus. Input your current savings, monthly contributions, and expected returns to see your projected nest egg.',
      category: 'Investment & Savings',
      tag: 'Future Planning',
    },
    {
      name: 'Investment Return (ROI)',
      path: '/calculators/roi',
      icon: BarChart,
      description: 'Calculate the percentage return on any investment. Simply enter your initial investment and current/final value to see your ROI and net profit or loss.',
      category: 'Investment & Savings',
      tag: 'Returns',
    },
    {
      name: 'Savings Interest',
      path: '/calculators/savings-interest',
      icon: PiggyBank,
      description: 'See how your savings grow over time with regular monthly deposits and compound interest. Includes a year-by-year growth chart for clear visualization.',
      category: 'Investment & Savings',
      tag: 'Savings',
    },
  ];

  const categories = [...new Set(calculators.map(c => c.category))];
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

  return (
    <>
      <Helmet>
        <title>Free Financial Calculators - EMI, Loan, Mortgage, Investment</title>
<<<<<<< HEAD
        <meta name="description" content="Explore a comprehensive suite of 50+ free online financial calculators. Calculate EMIs, compare loans, estimate mortgage payments, plan for retirement, and analyze investments with our easy-to-use tools." />
=======
        <meta name="description" content="Explore a comprehensive suite of 10+ free online financial calculators. Calculate EMIs, compare loans, estimate mortgage payments, plan for retirement, and analyze investments with our easy-to-use tools." />
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        <link rel="canonical" href="https://your-website.com/calculators" />
      </Helmet>
      <div className="bg-white overflow-hidden">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-800">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-brand-accent font-medium backdrop-blur-sm mb-6">
              <Zap className="h-4 w-4" />
<<<<<<< HEAD
              50+ Professional Tools
=======
              10+ Professional Tools
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Financial <span className="gradient-text">Calculators</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A complete suite of professional-grade financial tools designed to help you make smarter decisions about loans, investments, savings, and retirement planning.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="text-center">
<<<<<<< HEAD
                <p className="text-2xl font-extrabold text-brand-accent">50+</p>
=======
                <p className="text-2xl font-extrabold text-brand-accent">10+</p>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                <p className="text-sm text-gray-400">Calculators</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-brand-accent">100%</p>
                <p className="text-sm text-gray-400">Free to Use</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-brand-accent">Real-Time</p>
                <p className="text-sm text-gray-400">Instant Results</p>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Search Bar */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a calculator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-gray-300 px-6 py-4 pr-12 text-sm shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-12 bg-gray-50">
=======
        {/* Calculators Grid */}
        <section className="py-24 bg-gray-50">
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {categories.map(category => (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                      <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<<<<<<< HEAD
                  {filteredCalculators.filter(calc => calc.category === category).map((calc, idx) => (
                    <Link
                      key={calc.title}
                      to={calc.path}
                      className={`group card-hover rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm`}
=======
                  {calculators.filter(calc => calc.category === category).map((calc, idx) => (
                    <Link
                      key={calc.name}
                      to={calc.path}
                      className={`reveal delay-${(idx % 3 + 1) * 100} group card-hover rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm`}
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                    >
                      <div className={`h-48 relative flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 group-hover:opacity-90 transition-opacity`}>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-black/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                            {calc.tag}
                          </span>
                        </div>
                        <calc.icon className="h-16 w-16 text-gray-600" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
<<<<<<< HEAD
                          {calc.title}
=======
                          {calc.name}
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">{calc.description}</p>
                        <div className="mt-4 flex items-center text-brand-secondary font-semibold text-sm group-hover:text-brand-primary transition-colors">
                          Open Calculator <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
<<<<<<< HEAD
             {filteredCalculators.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-3xl font-extrabold text-gray-900">No Calculators Found</h2>
                <p className="mt-4 text-gray-500">Your search for "{searchTerm}" did not return any results.</p>
              </div>
            )}
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
          </div>
        </section>

        {/* Info Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
<<<<<<< HEAD
              <div>
=======
              <div className="reveal-left">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80"
                  alt="Person using financial calculator tools for planning"
                  className="rounded-3xl shadow-xl w-full h-auto object-cover"
                />
              </div>
              <div className="reveal-right">
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">How Our Calculators Work</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Accurate, Fast & <span className="text-brand-secondary">Easy to Use</span>
                </h2>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  All our calculators use industry-standard financial formulas and perform computations in real-time as you adjust the input values. Results are displayed instantly with visual charts and detailed breakdowns, making it easy to understand your financial scenarios.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    'Real-time calculations as you type or adjust sliders',
                    'Visual pie charts and bar graphs for clear breakdowns',
                    'All processing done on your device — 100% private',
                    'Mobile-friendly responsive design for on-the-go access',
                    'No sign-up or registration required — completely free',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">✓</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
