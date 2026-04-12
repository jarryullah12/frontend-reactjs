
import { Helmet } from 'react-helmet-async';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Zap,
  Award,
  Heart,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export function About() {
  useScrollReveal();

  const values = [
    { icon: ShieldCheck, title: 'Accuracy First', desc: 'Our calculators use industry-standard financial formulas verified by finance professionals to ensure every result is precise and reliable.' },
    { icon: Zap, title: 'Speed & Simplicity', desc: 'Get instant results with our lightning-fast calculators. No sign-ups, no downloads — just enter your numbers and see results in real time.' },
    { icon: Heart, title: 'User Privacy', desc: 'All calculations happen directly on your device. We never store, transmit, or sell your financial data. Your privacy is our top priority.' },
    { icon: Globe, title: 'Free For Everyone', desc: 'We believe financial literacy should be accessible to all. Every tool on FinovaCalc is 100% free to use with no hidden charges or premium tiers.' },
  ];

  return (
    <>
      <Helmet>
        <title>About FinovaCalc | Our Mission, Values, and Team</title>
        <meta name="description" content="Learn about the mission, values, and team behind FinovaCalc. Discover how we're making financial literacy accessible to everyone with our free, accurate, and easy-to-use financial calculators." />
        <link rel="canonical" href="https://www.finovacalc.com/about" />
        <meta name="keywords" content="about finovacalc, financial literacy, free financial tools, finovacalc team, our mission, financial empowerment" />
        <meta property="og:title" content="About FinovaCalc | Our Mission, Values, and Team" />
        <meta property="og:description" content="Learn about the mission, values, and team behind FinovaCalc. Discover how we're making financial literacy accessible to everyone with our free, accurate, and easy-to-use financial calculators." />
        <meta property="og:url" content="https://www.finovacalc.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.finovacalc.com/og-image-about.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About FinovaCalc | Our Mission, Values, and Team" />
        <meta name="twitter:description" content="Learn about the mission, values, and team behind FinovaCalc. Discover how we're making financial literacy accessible to everyone with our free, accurate, and easy-to-use financial calculators." />
        <meta name="twitter:image" content="https://www.finovacalc.com/twitter-image-about.png" />
      </Helmet>
      <div className="bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-gray-800">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-brand-accent font-medium backdrop-blur-sm mb-6">
                  <Award className="h-4 w-4" />
                  About FinovaCalc
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  Empowering Your <span className="gradient-text">Financial Journey</span>
                </h1>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
                  FinovaCalc was founded with a simple belief: everyone deserves access to professional-grade financial tools. We build calculators that are accurate, intuitive, and completely free.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-3xl blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="reveal-left">
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-3xl blur-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80"
                    alt="Financial planning and analysis at a desk with calculator and documents"
                    className="relative rounded-3xl shadow-xl w-full h-auto object-cover"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-brand-primary text-white rounded-2xl p-5 shadow-xl">
                    <Target className="h-8 w-8 text-brand-accent mb-2" />
                    <p className="font-bold text-sm">Our Mission</p>
                    <p className="text-xs text-gray-300 mt-1">Simplify Finance</p>
                  </div>
                </div>
              </div>
              <div className="reveal-right">
                <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Making Financial Literacy <span className="text-brand-secondary">Accessible to All</span>
                </h2>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  At FinovaCalc, we believe that financial literacy is the cornerstone of a secure future. Our mission is to empower individuals, families, and businesses with the tools they need to make informed financial decisions — without the complexity, cost, or confusion that often comes with professional financial software.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Whether you are a first-time homebuyer calculating your mortgage payments, a young professional planning for retirement, or an investor analyzing your returns, our suite of 10+ calculators is designed to give you accurate, real-time results with beautiful visual breakdowns.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'Built on industry-standard financial formulas',
                    'Real-time calculations with visual charts',
                    'Zero data collection — 100% client-side processing',
                    'Completely free with no premium paywalls',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center reveal">
              <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Our Core <span className="text-brand-secondary">Values</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                These principles guide everything we build and every decision we make at FinovaCalc.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={value.title} className={`reveal delay-${(idx + 1) * 100} card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/20">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center reveal">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Meet the Team
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                The passionate people behind the platform.
              </p>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Our dedicated team of FinovaCalc expert, developers, and content strategists works to build high-quality tools for marketers and businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative py-24 overflow-hidden bg-gray-800">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-1 gap-16 items-center">
              <div className="reveal-left">
                <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">Why FinovaCalc</span>
                <p className="mt-6 text-gray-300 leading-relaxed">
                  We are not just another calculator website. FinovaCalc provides a comprehensive suite of professional-grade financial tools designed for accuracy, speed, and ease of use. Our calculators are trusted by individuals, financial advisors, and businesses worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center reveal-scale">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Ready to Start Calculating?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore our complete suite of 10+ financial calculators and take control of your financial future today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/calculators"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore All Calculators
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-primary px-8 py-4 text-base font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
