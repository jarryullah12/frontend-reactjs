import { useState, useEffect } from 'react';
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
  const [prices, setPrices] = useState<Record<string, { price: number, formatted: string }>>({});

  useEffect(() => {
    fetch('/api/lemonsqueezy/prices')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setPrices(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleCheckout = async (planName: string, checkoutId?: string) => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (!checkoutId) {
      // Free plan
      navigate('/');
      return;
    }

    setLoadingPlan(planName);
    try {
      // Use direct Lemon Squeezy checkout URL (works perfectly on static/live domains without needing a backend)
      const checkoutUrl = new URL(`https://checkout.getoptiseo.com/checkout/buy/${checkoutId}`);
      
      // Pass the user ID to Lemon Squeezy so it comes back in the webhook
      checkoutUrl.searchParams.append('checkout[custom][user_id]', user.id);
      checkoutUrl.searchParams.append('logo', '0');
      
      // Redirect user to checkout
      window.location.href = checkoutUrl.toString();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again or check your variant IDs.');
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: 'Free Trial',
      description: '7 Days free access to 50 free tools.',
      price: 0,
      currency: '$',
      period: '/7 days',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
      variantId: null,
      checkoutId: null
    },
    {
      name: 'Premium',
      description: 'Continue using 50 free SEO tools.',
      price: prices['1469064']?.price || 1.99,
      currency: prices['1469064']?.formatted ? '' : '$',
      formattedPrice: prices['1469064']?.formatted || '1.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: false },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Export Results', included: false },
      ],
      cta: 'Get Premium',
      popular: false,
      variantId: '1469064',
      checkoutId: 'b4efcbb2-b77a-486f-8929-32580046e8c5'
    },
    {
      name: 'Pro',
      description: 'Unlock more power with all 100+ SEO tools.',
      price: prices['1469062']?.price || 3.99,
      currency: prices['1469062']?.formatted ? '' : '$',
      formattedPrice: prices['1469062']?.formatted || '3.99',
      period: '/month',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results', included: true },
      ],
      cta: 'Get Pro',
      popular: true,
      variantId: '1469062',
      checkoutId: '55333cfd-17b9-4fe4-923f-79f3ecdf447f'
    },
    {
      name: 'Lifetime Pro',
      description: 'Get lifetime access to all premium features.',
      price: prices['1436021']?.price || 79.99,
      currency: prices['1436021']?.formatted ? '' : '$',
      formattedPrice: prices['1436021']?.formatted || '79.99',
      period: '',
      features: [
        { name: '50 Free SEO Tools', included: true },
        { name: '100+ Premium SEO Tools', included: true },
        { name: 'Unlimited Tool Uses', included: true },
        { name: 'Advanced SEO Analysis', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export Results', included: true },
      ],
      cta: 'Get Lifetime Access',
      popular: false,
      variantId: '1436021',
      checkoutId: 'c77fe82c-549f-4750-beaf-649cda680661'
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
                {plan.formattedPrice || plan.price.toLocaleString()}
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
              onClick={() => handleCheckout(plan.name, plan.checkoutId || undefined)}
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
              { name: t('tools_list.items.meta_tag.name'), type: 'Free' },
              { name: t('tools_list.items.robots.name'), type: 'Free' },
              { name: t('tools_list.items.sitemap.name'), type: 'Free' },
              { name: t('tools_list.items.backlink_checker.name'), type: 'Free' },
              { name: t('tools_list.items.da_checker.name'), type: 'Free' },
              { name: t('tools_list.items.broken_link.name'), type: 'Free' },
              { name: t('tools_list.items.schema.name'), type: 'Free' },
              { name: t('tools_list.items.plagiarism_checker.name'), type: 'Free' },
              { name: t('tools_list.items.density.name'), type: 'Free' },
              { name: t('tools_list.items.website_analyzer.name'), type: 'Free' },
              { name: t('tools_list.items.analyzer.name'), type: 'Free' },
              { name: t('tools_list.items.css_min.name'), type: 'Free' },
              { name: t('tools_list.items.js_min.name'), type: 'Free' },
              { name: t('tools_list.items.blog_gen.name'), type: 'Free' },
              { name: t('tools_list.items.rewriter.name'), type: 'Free' },
              { name: t('tools_list.items.product_description.name'), type: 'Free' },
              { name: t('tools_list.items.ideas.name'), type: 'Free' },
              { name: t('tools_list.items.sales_email.name'), type: 'Free' },
              { name: t('tools_list.items.bio.name'), type: 'Free' },
              { name: t('tools_list.items.social_caption.name'), type: 'Free' },
              { name: 'Keyword Suggestion Tool', type: 'Free' },
              { name: 'Long Tail Keyword Generator', type: 'Free' },
              { name: 'Page Authority Checker', type: 'Free' },
              { name: 'Google Index Checker', type: 'Free' },
              { name: 'XML Sitemap Validator', type: 'Free' },
              { name: 'Keyword Position Checker', type: 'Free' },
              { name: 'Word Counter', type: 'Free' },
              { name: 'Character Counter', type: 'Free' },
              { name: 'Case Converter', type: 'Free' },
              { name: 'Reverse Image Search', type: 'Free' },
              { name: 'Image Compressor', type: 'Free' },
              { name: 'Favicon Generator', type: 'Free' },
              { name: 'Htaccess Generator', type: 'Free' },
              { name: 'SSL Checker', type: 'Free' },
              { name: 'What Is My IP', type: 'Free' },
              { name: 'Server Status Checker', type: 'Free' },
              { name: 'Website Screenshot Generator', type: 'Free' },
              { name: 'URL Rewriting Tool', type: 'Free' },
              { name: 'Grammar Checker', type: 'Free' },
              { name: 'Readability Checker', type: 'Free' },
              { name: 'MD5 Generator', type: 'Free' },
              { name: 'SHA1 Generator', type: 'Free' },
              { name: 'Base64 Encoder/Decoder', type: 'Free' },
              { name: 'HTML Minifier', type: 'Free' },
              { name: 'JSON Formatter', type: 'Free' },
              { name: 'UTM Builder', type: 'Free' },
              { name: 'Open Graph Checker', type: 'Free' },
              { name: 'Twitter Card Generator', type: 'Free' },
              { name: 'Canonical Tag Generator', type: 'Free' },
              { name: 'HTTP Headers Checker', type: 'Free' },
              { name: t('tools_list.items.privacy_policy.name'), type: 'Premium' },
              { name: t('tools_list.items.url_codec.name'), type: 'Premium' },
              { name: 'Keyword Clustering Tool', type: 'Premium' },
              { name: 'SERP Simulator', type: 'Premium' },
              { name: 'LSI Keyword Generator', type: 'Premium' },
              { name: 'Bulk URL Checker', type: 'Premium' },
              { name: 'Hreflang Tag Generator', type: 'Premium' },
              { name: 'Schema Generator (FAQ)', type: 'Premium' },
              { name: 'Schema Generator (Local Business)', type: 'Premium' },
              { name: 'Schema Generator (Review)', type: 'Premium' },
              { name: 'Meta Description Generator', type: 'Premium' },
              { name: 'Title Tag Generator', type: 'Premium' },
              { name: 'Blog Post Title Generator', type: 'Premium' },
              { name: 'Content Outline Generator', type: 'Premium' },
              { name: 'Paragraph Rewriter', type: 'Premium' },
              { name: 'Sentence Expander', type: 'Premium' },
              { name: 'Text Summarizer', type: 'Premium' },
              { name: 'Readability Improver', type: 'Premium' },
              { name: 'Keyword Typo Generator', type: 'Premium' },
              { name: 'Google Autocomplete Extractor', type: 'Premium' },
              { name: 'YouTube Keyword Tool', type: 'Premium' },
              { name: 'Amazon Keyword Tool', type: 'Premium' },
              { name: 'Bing Keyword Tool', type: 'Premium' },
              { name: 'Yandex Keyword Tool', type: 'Premium' },
              { name: 'App Store Keyword Tool', type: 'Premium' },
              { name: 'SEO Report Generator', type: 'Premium' },
              { name: 'Competitor Analysis Tool', type: 'Premium' },
              { name: 'Backlink Maker', type: 'Premium' },
              { name: 'Link Value Calculator', type: 'Premium' },
              { name: 'Website Speed Test', type: 'Premium' },
              { name: 'Mobile Friendly Test', type: 'Premium' },
              { name: 'Core Web Vitals Checker', type: 'Premium' },
              { name: 'HTML Validator', type: 'Premium' },
              { name: 'CSS Validator', type: 'Premium' },
              { name: 'XML Sitemap Formatter', type: 'Premium' },
              { name: 'Robots.txt Tester', type: 'Premium' },
              { name: 'Redirect Checker', type: 'Premium' },
              { name: 'HTTP/2 Checker', type: 'Premium' },
              { name: 'DNS Lookup Tool', type: 'Premium' },
              { name: 'WHOIS Lookup', type: 'Premium' },
              { name: 'IP Location Finder', type: 'Premium' },
              { name: 'Reverse IP Domain Checker', type: 'Premium' },
              { name: 'Server Port Scanner', type: 'Premium' },
              { name: 'Email Privacy Checker', type: 'Premium' },
              { name: 'Safe Browsing Checker', type: 'Premium' },
              { name: 'Google Cache Checker', type: 'Premium' },
              { name: 'Mozrank Checker', type: 'Premium' },
              { name: 'Alexa Rank Checker', type: 'Premium' },
              { name: 'Keyword ROI Calculator', type: 'Premium' },
              { name: 'CPC Calculator', type: 'Premium' },
              { name: 'URL Slug Generator', type: 'Premium' },
              { name: 'Domain Age Checker', type: 'Premium' }
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
