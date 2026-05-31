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
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');

  const buildDirectCheckoutUrl = (rawCheckoutUrl: string) => {
    const checkoutUrl = new URL(rawCheckoutUrl);
    if (user?.id) {
      checkoutUrl.searchParams.set('checkout[custom][user_id]', user.id);
    }
    if (user?.email) {
      checkoutUrl.searchParams.set('checkout[email]', user.email);
    }
    return checkoutUrl.toString();
  };

  const redirectToDirectCheckout = (checkoutUrl?: string | null) => {
    if (!checkoutUrl) return false;
    window.location.href = buildDirectCheckoutUrl(checkoutUrl);
    return true;
  };

  const handleCheckout = async (planName: string, variantId?: string | null, checkoutUrl?: string | null) => {
    // Prefer direct shareable checkout links when available.
    if (redirectToDirectCheckout(checkoutUrl)) {
      return;
    }

    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (!variantId) {
      navigate('/');
      return;
    }

    setLoadingPlan(planName);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const apiUrl = `${baseUrl}/api/lemonsqueezy/checkout`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId,
          userId: user.id || 'anonymous',
          redirectUrl: 'https://getoptiseo.com/'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Checkout API non-200 response:', response.status, errorText);
        if (redirectToDirectCheckout(checkoutUrl)) {
          return;
        }
        throw new Error(`Checkout request failed (${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response text is:', text);
        if (redirectToDirectCheckout(checkoutUrl)) {
          return;
        }
        throw new Error('Server returned an unexpected response: ' + text.substring(0, 100));
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        if (redirectToDirectCheckout(checkoutUrl)) {
          return;
        }
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      if (redirectToDirectCheckout(checkoutUrl)) {
        return;
      }
      alert('Failed to initiate checkout: ' + error.message);
      setLoadingPlan(null);
    }
  };

  const monthlyPlans = [
    {
      name: 'Free Trial',
      description: '7 Days free access to 50 free tools.',
      price: 0,
      currency: '$',
      formattedPrice: '0',
      period: '/7 days',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results (PDF)', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
      variantId: null,
      checkoutUrl: null
    },
    {
      name: 'Premium',
      description: 'Continue using 50 free SEO tools.',
      price: 14.99,
      currency: '$',
      formattedPrice: '14.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results (PDF)', included: false },
      ],
      cta: 'Get Premium',
      popular: false,
      variantId: '1469064',
      checkoutUrl: 'https://getoptiseo.lemonsqueezy.com/checkout/buy/b4efcbb2-b77a-486f-8929-32580046e8c5'
    },
    {
      name: 'Pro',
      description: 'Unlock more power with all 100+ SEO tools.',
      price: 17.99,
      currency: '$',
      formattedPrice: '17.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Pro',
      popular: true,
      variantId: '1469062',
      checkoutUrl: 'https://getoptiseo.lemonsqueezy.com/checkout/buy/55333cfd-17b9-4fe4-923f-79f3ecdf447f'
    }
  ];

  const yearlyPlans = [
    {
      name: 'Yearly Plan 1',
      description: 'Get access to premium features.',
      price: 9.99,
      currency: '$',
      formattedPrice: '9.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Yearly Plan 1',
      popular: true,
      variantId: '1436021',
      checkoutUrl: 'https://getoptiseo.lemonsqueezy.com/checkout/buy/c77fe82c-549f-4750-beaf-649cda680661'
    },
    {
      name: 'Yearly Plan 2',
      description: 'Get access to premium features.',
      price: 11.99,
      currency: '$',
      formattedPrice: '11.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Yearly Plan 2',
      popular: false,
      variantId: '1630945',
      checkoutUrl: 'https://getoptiseo.lemonsqueezy.com/checkout/buy/a846a2fc-0c2b-434d-9634-f1aad95dc629'
    },
    {
      name: 'Yearly Plan 3',
      description: 'Get access to premium features.',
      price: 12.99,
      currency: '$',
      formattedPrice: '12.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results (PDF)', included: true },
      ],
      cta: 'Get Yearly Plan 3',
      popular: false,
      variantId: '1631002',
      checkoutUrl: 'https://getoptiseo.lemonsqueezy.com/checkout/buy/5aa484ad-afc8-4ed2-9ec5-281bfec2ebfd'
    }
  ];

  const currentPlans = activeTab === "monthly" ? monthlyPlans : yearlyPlans;
  const getYearlySavingsText = (planName: string) => {
    if (planName === 'Yearly Plan 1') return 'billed yearly, save 20%';
    if (planName === 'Yearly Plan 2') return 'billed yearly, save 15%';
    if (planName === 'Yearly Plan 3') return 'billed yearly, save 10%';
    return 'billed yearly';
  };

  const freeTools = [
    'Meta Tag Generator', 'Robots.txt Generator', 'XML Sitemap Generator', 'Backlink Checker', 'DA Checker', 
    'Broken Link Checker', 'Schema Validator', 'Plagiarism Checker', 'Keyword Density', 'Website Analyzer', 
    'Content Analyzer', 'CSS Minifier', 'JS Minifier', 'AI Blog Generator', 'AI Article Rewriter', 
    'AI Product Description', 'AI Content Ideas', 'AI Sales Email', 'AI Social Bio', 'AI Social Caption', 
    'Keyword Suggestion Tool', 'Long Tail Keyword Generator', 'Page Authority Checker', 'Google Index Checker', 
    'XML Sitemap Validator', 'Keyword Position Checker', 'Word Counter', 'Character Counter', 'Case Converter', 
    'Reverse Image Search', 'Image Compressor', 'Favicon Generator', 'Htaccess Generator', 'SSL Checker', 
    'What Is My IP', 'Server Status Checker', 'Website Screenshot Generator', 'URL Rewriting Tool', 
    'Grammar Checker', 'Readability Checker', 'MD5 Generator', 'SHA1 Generator', 'Base64 Encoder/Decoder', 
    'HTML Minifier', 'JSON Formatter', 'UTM Builder', 'Open Graph Checker', 'Twitter Card Generator', 
    'Canonical Tag Generator', 'HTTP Headers Checker'
  ];

  const premiumTools = [
    'Privacy Policy Generator', 'URL Encoder/Decoder', 'Keyword Clustering Tool', 'SERP Simulator', 
    'LSI Keyword Generator', 'Bulk URL Checker', 'Hreflang Tag Generator', 'Schema Generator (FAQ)', 
    'Schema Generator (Local Business)', 'Schema Generator (Review)', 'Meta Description Generator', 
    'Title Tag Generator', 'Blog Post Title Generator', 'Content Outline Generator', 'Paragraph Rewriter', 
    'Sentence Expander', 'Text Summarizer', 'Readability Improver', 'Keyword Typo Generator', 
    'Google Autocomplete Extractor', 'YouTube Keyword Tool', 'Amazon Keyword Tool', 'Bing Keyword Tool', 
    'Yandex Keyword Tool', 'App Store Keyword Tool', 'SEO Report Generator', 'Competitor Analysis Tool', 
    'Backlink Maker', 'Link Value Calculator', 'Website Speed Test', 'Mobile Friendly Test', 
    'Core Web Vitals Checker', 'HTML Validator', 'CSS Validator', 'XML Sitemap Formatter', 'Robots.txt Tester', 
    'Redirect Checker', 'HTTP/2 Checker', 'DNS Lookup Tool', 'WHOIS Lookup', 'IP Location Finder', 
    'Reverse IP Domain Checker', 'Server Port Scanner', 'Email Privacy Checker', 'Safe Browsing Checker', 
    'Google Cache Checker', 'Mozrank Checker', 'Alexa Rank Checker', 'Keyword ROI Calculator', 'CPC Calculator', 
    'URL Slug Generator', 'Domain Age Checker'
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
          Pricing Plans
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
          Supercharge your SEO strategy with our specialized AI tools.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex">
          <button 
            onClick={() => setActiveTab("monthly")}
            className={cn(
              "px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
              activeTab === "monthly" ? "bg-white dark:bg-gray-700 text-[#4f39f6] shadow-sm transform scale-105" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            Monthly Plans
          </button>
          <button 
            onClick={() => setActiveTab("yearly")}
            className={cn(
              "px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
              activeTab === "yearly" ? "bg-white dark:bg-gray-700 text-[#4f39f6] shadow-sm transform scale-105" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            Yearly - Save 20%
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
        {currentPlans.map((plan, index) => (
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

            <div className="mb-8">
              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-gray-400 mr-1 font-medium text-2xl">
                  {plan.currency}
                </span>
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.formattedPrice || plan.price.toLocaleString()}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 font-medium">
                  {plan.period}
                </span>
              </div>
              {activeTab === "yearly" && (
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  {getYearlySavingsText(plan.name)}
                </div>
              )}
              
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
              onClick={() => handleCheckout(plan.name, plan.variantId, plan.checkoutUrl)}
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
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Yearly Plan 1</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Yearly Plan 2</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-center">Yearly Plan 3</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPlans[0].features.map((feature, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4 text-gray-600 dark:text-gray-300">{feature.name}</td>
                  <td className="p-4 text-center">
                    {monthlyPlans[0].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {monthlyPlans[1].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {monthlyPlans[2].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {yearlyPlans[0].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {yearlyPlans[1].features[i].included ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4f39f6] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {yearlyPlans[2].features[i].included ? (
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

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Complete Tool Access Directory</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See exactly which tools are included in each plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Free Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 dark:bg-gray-700/50 rounded-bl-full -mr-10 -mt-10 transition-transform hover:scale-110"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4 mb-6 relative z-10 flex items-center gap-3">
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2.5 py-1 rounded-md uppercase tracking-wider font-bold shadow-sm">Free Trial</span>
              Free Trial Tools (50 Tools)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 relative z-10">
              {freeTools.map((tool, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Tools */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-[#0f0c29] rounded-3xl p-10 border border-indigo-100 dark:border-gray-800 shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#4f39f6]/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f39f6]/10 rounded-bl-full -mr-10 -mt-10 transition-transform hover:scale-110"></div>
            <h3 className="text-2xl font-bold text-[#4f39f6] dark:text-white border-b border-indigo-100 dark:border-gray-800 pb-4 mb-6 relative z-10 flex items-center gap-3">
              <span className="bg-[#4f39f6] text-white text-xs px-2.5 py-1 rounded-md uppercase tracking-wider font-bold shadow-sm">Pro</span>
              Premium Tools (50+ Tools)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 relative z-10">
              {premiumTools.map((tool, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-[#4f39f6] rounded-full p-0.5 mt-0.5 shrink-0 shadow-sm shadow-[#4f39f6]/30">
                     <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
