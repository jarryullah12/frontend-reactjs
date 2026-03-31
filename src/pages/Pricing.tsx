import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { SEO } from '../components/SEO';
import { useNavigate } from 'react-router-dom';

export function Pricing() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planName: string, variantId?: string) => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (!variantId) {
      // Free plan
      navigate('/');
      return;
    }

    const selectedPlan = plans.find(p => p.name === planName);
    navigate('/payment', { state: { plan: selectedPlan } });
  };

  const plans = [
    {
      name: 'Free Trial',
      description: '7 Days free access to 10 essential tools.',
      price: 0,
      currency: '$',
      period: '/7 days',
      features: [
        { name: '10 Essential SEO Tools', included: true },
        { name: '50+ Advanced SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results (PDF)', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
      variantId: null
    },
    {
      name: 'Premium',
      description: 'Continue using 10 essential SEO tools.',
      price: 4,
      currency: '$',
      period: '/month',
      features: [
        { name: '10 Essential SEO Tools', included: true },
        { name: '50+ Advanced SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results (PDF)', included: false },
      ],
      cta: 'Get Premium',
      popular: false,
      variantId: 'premium_variant_id'
    },
    {
      name: 'Pro',
      description: 'Unlock more power with all 50+ SEO tools.',
      price: 8,
      currency: '$',
      period: '/month',
      features: [
        { name: '10 Essential SEO Tools', included: true },
        { name: '50+ Advanced SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Pro',
      popular: true,
      variantId: '1417065'
    },
    {
      name: 'Lifetime Pro',
      description: 'Get lifetime access to all premium features.',
      price: 500,
      currency: '$',
      period: '',
      features: [
        { name: '10 Essential SEO Tools', included: true },
        { name: '50+ Advanced SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Lifetime Access',
      popular: false,
      variantId: '1437208'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <SEO 
        title="Pricing Plans" 
        description="Choose the perfect plan for your SEO needs. Get unlimited access to our premium SEO tools and AI content generators."
        keywords="SEO tools pricing, premium SEO tools, OptiSEO pricing, affordable SEO tools"
      />
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {t('pricing.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col p-8 rounded-3xl border transition-all",
              plan.popular
                ? "bg-white dark:bg-gray-900 border-[#4f39f6] shadow-xl shadow-[#4f39f6]/10 scale-105 z-10"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#4f39f6]/50 dark:hover:border-[#4f39f6]/50"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-[#4f39f6] px-3 py-1 text-center text-sm font-medium text-white shadow-sm">
                Recommended
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm h-10">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline text-gray-900 dark:text-white">
              <span className="text-gray-500 dark:text-gray-400 mr-1 font-medium text-2xl">
                {plan.currency}
              </span>
              <span className="text-5xl font-extrabold tracking-tight">
                {plan.price.toLocaleString()}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1 font-medium">
                {plan.period}
              </span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  {feature.included ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4f39f6] shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                  )}
                  <span className={cn("text-sm", feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500")}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.name, plan.variantId || undefined)}
              disabled={loadingPlan === plan.name}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2",
                plan.popular
                  ? "bg-[#4f39f6] text-white hover:bg-[#4f39f6]/90 shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700",
                loadingPlan === plan.name && "opacity-75 cursor-not-allowed"
              )}
            >
              {loadingPlan === plan.name ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                plan.cta
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Plan Comparison Section */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">Feature</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Free Trial</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Premium</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Pro</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Lifetime Pro</th>
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((feature, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4 text-gray-600 dark:text-gray-300">{feature.name}</td>
                  <td className="p-4 text-center">
                    {plans[0].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {plans[1].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {plans[2].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {plans[3].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tools Included in Free Trial & Premium */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-200 dark:border-gray-800 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          All SEO Tools Overview
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Website Analyzer', type: 'Free' },
              { name: 'Keyword Density Checker', type: 'Free' },
              { name: 'AI Blog Generator', type: 'Free' },
              { name: 'AI Article Rewriter', type: 'Free' },
              { name: 'Backlink Checker', type: 'Free' },
              { name: 'Plagiarism Checker', type: 'Free' },
              { name: 'AI Product Description', type: 'Free' },
              { name: 'DA Checker', type: 'Free' },
              { name: 'Keyword Suggestion Tool', type: 'Free' },
              { name: 'Grammar Checker', type: 'Free' },
              { name: 'Meta Tag Generator', type: 'Premium' },
              { name: 'Robots.txt Generator', type: 'Premium' },
              { name: 'XML Sitemap Generator', type: 'Premium' },
              { name: 'Schema Validator', type: 'Premium' },
              { name: 'Content Analyzer', type: 'Premium' },
              { name: 'CSS Minifier', type: 'Premium' },
              { name: 'JS Minifier', type: 'Premium' },
              { name: 'AI Content Ideas', type: 'Premium' },
              { name: 'AI Sales Email', type: 'Premium' },
              { name: 'AI Social Bio', type: 'Premium' },
              { name: 'Privacy Policy Generator', type: 'Premium' },
              { name: 'Broken Link Checker', type: 'Premium' },
              { name: 'AI Social Caption', type: 'Premium' },
              { name: 'URL Encoder/Decoder', type: 'Premium' },
              { name: 'Long Tail Keyword Generator', type: 'Premium' },
              { name: 'Page Authority Checker', type: 'Premium' },
              { name: 'Google Index Checker', type: 'Premium' },
              { name: 'XML Sitemap Validator', type: 'Premium' },
              { name: 'Keyword Position Checker', type: 'Premium' },
              { name: 'Word Counter', type: 'Premium' },
              { name: 'Character Counter', type: 'Premium' },
              { name: 'Case Converter', type: 'Premium' },
              { name: 'Reverse Image Search', type: 'Premium' },
              { name: 'Image Compressor', type: 'Premium' },
              { name: 'Favicon Generator', type: 'Premium' },
              { name: 'Htaccess Generator', type: 'Premium' },
              { name: 'SSL Checker', type: 'Premium' },
              { name: 'What Is My IP', type: 'Premium' },
              { name: 'Server Status Checker', type: 'Premium' },
              { name: 'Website Screenshot Generator', type: 'Premium' },
              { name: 'URL Rewriting Tool', type: 'Premium' },
              { name: 'Readability Checker', type: 'Premium' },
              { name: 'MD5 Generator', type: 'Premium' },
              { name: 'SHA1 Generator', type: 'Premium' },
              { name: 'Base64 Encoder/Decoder', type: 'Premium' },
              { name: 'HTML Minifier', type: 'Premium' },
              { name: 'JSON Formatter', type: 'Premium' },
              { name: 'UTM Builder', type: 'Premium' },
              { name: 'Open Graph Checker', type: 'Premium' },
              { name: 'Twitter Card Generator', type: 'Premium' },
              { name: 'Canonical Tag Generator', type: 'Premium' },
              { name: 'HTTP Headers Checker', type: 'Premium' }
            ].map((tool, index) => (
              <li key={index} className="flex items-center justify-between gap-3 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 shrink-0", tool.type === 'Free' ? "text-emerald-500" : "text-[#4f39f6]")} />
                  <span className="font-medium text-sm">{tool.name}</span>
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                  tool.type === 'Free' 
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                    : "bg-[#4f39f6]/10 text-[#4f39f6] dark:bg-[#4f39f6]/20"
                )}>
                  {tool.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
