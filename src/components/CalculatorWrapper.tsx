import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

interface CalculatorWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function CalculatorWrapper({ title, description, children }: CalculatorWrapperProps) {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Header */}
<<<<<<< HEAD
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gray-800">
=======
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
            alt={`${title} - Free financial calculator tool`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-primary/90 to-brand-primary/80" />
        </div>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> All Calculators
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 flex items-center justify-center">
              <Calculator className="h-7 w-7 text-brand-accent" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-6 sm:p-10">
            {children}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. Results may vary based on actual terms and conditions from financial institutions. Please consult a qualified financial advisor before making any financial decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
