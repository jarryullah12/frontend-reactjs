
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../supabaseClient';
import {
  Calculator,
  TrendingUp,
  PieChart,
  ArrowRight,
  Star,
  Users,
  Zap,
  Target,
  BarChart3,
  Home as HomeIcon,
  Car,
  PiggyBank,
  CheckCircle2,
  ChevronRight,
  Play,
  Plus,
  Minus
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Post {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  category: string;
  created_at: string;
}

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function Home() {
  useScrollReveal();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchPosts();
  }, []);

  const featuredCalculators = [
    { name: 'EMI Calculator', path: '/calculators/emi', icon: Calculator, description: 'Calculate monthly EMI payments effortlessly with real-time breakdowns.' },
    { name: 'Compound Interest', path: '/calculators/compound-interest', icon: TrendingUp, description: 'See how your investments grow exponentially over time with compounding.' },
    { name: 'Retirement Planning', path: '/calculators/retirement', icon: PieChart, description: 'Plan your retirement and ensure a comfortable life after work.' },
    { name: 'Mortgage Calculator', path: '/calculators/mortgage', icon: HomeIcon, description: 'Estimate monthly mortgage payments including principal and interest.' },
    { name: 'Car Loan Calculator', path: '/calculators/car-loan', icon: Car, description: 'Find out your monthly car payments with our easy calculator.' },
    { name: 'Savings Calculator', path: '/calculators/savings-interest', icon: PiggyBank, description: 'See how your savings grow with regular deposits and interest.' },
  ];

  const steps = [
<<<<<<< HEAD
    { step: '01', title: 'Choose Calculator', desc: 'Select from 50+ professional financial calculators tailored to your needs.', icon: Target },
=======
    { step: '01', title: 'Choose Calculator', desc: 'Select from 10+ professional financial calculators tailored to your needs.', icon: Target },
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    { step: '02', title: 'Enter Your Details', desc: 'Input your financial data with our intuitive sliders and input fields.', icon: Zap },
    { step: '03', title: 'Get Instant Results', desc: 'See real-time calculations with visual charts and detailed breakdowns.', icon: BarChart3 },
  ];

  const faqs = [
    { q: 'What is FinovaCalc?', a: 'FinovaCalc is a free online platform providing a suite of financial calculators to help you make smart financial decisions.' },
    { q: 'Are the calculators free to use?', a: 'Yes, all our calculators are completely free to use. No hidden charges or subscriptions.' },
    { q: 'Do I need to create an account?', a: 'No, you can use all our tools without creating an account. We prioritize your privacy and convenience.' },
    { q: 'What kinds of calculators are available?', a: 'We offer a wide range of calculators, including EMI, mortgage, compound interest, retirement, car loan, and more.' },
    { q: 'How accurate are the calculations?', a: 'Our calculators use standard financial formulas to provide you with accurate and reliable results.' },
    { q: 'Can I use FinovaCalc on my mobile device?', a: 'Yes, our website is fully responsive and works beautifully on all devices, including desktops, tablets, and smartphones.' },
    { q: 'Is my data safe?', a: 'We do not store any of your personal financial data. All calculations are performed in your browser and are not saved on our servers.' },
    { q: 'Who is FinovaCalc for?', a: 'FinovaCalc is for everyone - from students learning about finance to professionals planning for retirement.' },
    { q: 'How can I contact support?', a: 'You can reach out to us through our Contact Us page for any questions or feedback.' },
    { q: 'Are you planning to add more calculators?', a: 'Yes, we are constantly working on adding new and useful financial calculators to our platform.' },
  ];

  return (
    <>
      <Helmet>
        <title>FinovaCalc: Free & Accurate Financial Calculators for Smart Decisions</title>
        <meta name="description" content="Master your finances with FinovaCalc's suite of free, professional-grade financial calculators. Calculate EMIs, plan investments, estimate loans, and secure your future. Fast, accurate, and easy to use." />
        <link rel="canonical" href="https://www.finovacalc.com/" />
        <meta name="keywords" content="financial calculators, free calculators, loan calculator, emi calculator, compound interest calculator, retirement planner, mortgage calculator, personal finance, investment calculator" />
        <meta property="og:title" content="FinovaCalc: Free & Accurate Financial Calculators for Smart Decisions" />
        <meta property="og:description" content="Master your finances with FinovaCalc's suite of free, professional-grade financial calculators. Calculate EMIs, plan investments, estimate loans, and secure your future. Fast, accurate, and easy to use." />
        <meta property="og:url" content="https://www.finovacalc.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.finovacalc.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FinovaCalc: Free & Accurate Financial Calculators for Smart Decisions" />
        <meta name="twitter:description" content="Master your finances with FinovaCalc's suite of free, professional-grade financial calculators. Calculate EMIs, plan investments, estimate loans, and secure your future. Fast, accurate, and easy to use." />
        <meta name="twitter:image" content="https://www.finovacalc.com/twitter-image.png" />
      </Helmet>
      <div className="bg-white overflow-hidden">
        {/* ───────── HERO SECTION ───────── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&q=70"
              alt="Financial district skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-primary/90 to-brand-primary/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <div className="animate-hero-text" style={{ animationDelay: '0.2s' }}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-brand-accent font-medium backdrop-blur-sm mb-6">
                    <Zap className="h-4 w-4" />
                    #1 Free Finance Calculator Platform
                  </span>
                </div>

                <h1 className="sr-only">Master Your Financial Future with FinovaCalc</h1>
                <div className="animate-hero-text" style={{ animationDelay: '0.4s' }}>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                    Master Your
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mt-2">
                    <span className="gradient-text">Financial Future</span>
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mt-2">
                    with FinovaCalc
                  </span>
                </div>

                <p className="mt-8 text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed animate-hero-text" style={{ animationDelay: '0.6s' }}>
                  Professional-grade financial tools to help you make smarter decisions. Calculate loans, plan investments, and secure your future — all for free.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4 animate-hero-text" style={{ animationDelay: '0.8s' }}>
                  <Link
                    to="/calculators"
                    className="group inline-flex items-center gap-2 rounded-xl bg-brand-accent px-7 py-4 text-base font-bold text-brand-dark shadow-lg shadow-brand-accent/30 hover:bg-yellow-400 hover:shadow-brand-accent/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Explore Calculators
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-7 py-4 text-base font-semibold text-white hover:bg-white/15 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Play className="h-5 w-5" />
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right: Hero Image Card */}
              <div className="hidden lg:block animate-hero-text" style={{ animationDelay: '0.6s' }}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-3xl blur-2xl" />
                  <div className="relative glass rounded-3xl p-1.5 shadow-2xl">
                    <img
<<<<<<< HEAD
                      src="https://i.postimg.cc/pV8hQ3Kx/desk.png"
=======
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70"
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                      alt="Financial Dashboard Analytics"
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  </div>
                  {/* Floating stats card */}
                  <div className="absolute -bottom-6 -left-8 glass rounded-2xl p-4 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">+24.5%</p>
                        <p className="text-gray-400 text-xs">Investment Growth</p>
                      </div>
                    </div>
                  </div>
                  {/* Floating calc card */}
                  <div className="absolute -top-4 -right-6 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-brand-accent" />
                      </div>
                      <div>
<<<<<<< HEAD
                        <p className="text-white font-bold text-sm">50+</p>
=======
                        <p className="text-white font-bold text-sm">10+</p>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                        <p className="text-gray-400 text-xs">Calculators</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill="white" />
            </svg>
          </div>
        </section>

<<<<<<< HEAD
=======
        {/* ───────── STATS SECTION ───────── */}
        <section className="py-16 bg-white relative -mt-1">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Users', value: 50000, suffix: '+', prefix: '', icon: Users, color: 'text-blue-600 bg-blue-100' },
                { label: 'Calculations Done', value: 2, suffix: 'M+', prefix: '', icon: Calculator, color: 'text-emerald-600 bg-emerald-100' },
                { label: 'Calculators', value: 10, suffix: '+', prefix: '', icon: BarChart3, color: 'text-purple-600 bg-purple-100' },
                { label: 'User Rating', value: 4.9, suffix: '/5', prefix: '', icon: Star, color: 'text-amber-600 bg-amber-100' },
              ].map((stat, idx) => (
                <div key={stat.label} className={`reveal delay-${(idx + 1) * 100} text-center`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.color} mb-4`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-brand-primary">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="mt-1 text-gray-500 font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        {/* ───────── FEATURED CALCULATORS ───────── */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center reveal">
              <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">Our Tools</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Powerful Financial <span className="text-brand-secondary">Calculators</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Professional-grade tools designed for everyday financial decisions. Fast, accurate, and beautifully visualized.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCalculators.map((calc, idx) => (
                <Link
                  key={calc.name}
                  to={calc.path}
                  className={`reveal delay-${(idx % 3 + 1) * 100} group card-hover rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm`}
                >
                  <div className={`h-48 relative flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 group-hover:opacity-90 transition-opacity`}>
                    <calc.icon className="h-16 w-16 text-gray-600" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{calc.description}</p>
                    <div className="mt-4 flex items-center text-brand-secondary font-semibold text-sm group-hover:text-brand-primary transition-colors">
                      Try Now <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center reveal">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
<<<<<<< HEAD
                View All 50+ Calculators
=======
                View All 10+ Calculators
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── HOW IT WORKS ───────── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="reveal-left">
                <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">How It Works</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  Simple Steps to <br /><span className="text-brand-secondary">Smart Decisions</span>
                </h2>
                <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                  No complicated setup. No account required. Just pick a calculator, enter your numbers, and get instant results with beautiful visualizations.
                </p>

                <div className="mt-10 space-y-8">
                  {steps.map((item, idx) => (
                    <div key={item.step} className={`reveal delay-${(idx + 1) * 200} flex items-start gap-5`}>
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-accent font-bold text-xs">{item.step}</span>
                          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="mt-1 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-right">
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-3xl blur-2xl" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
<<<<<<< HEAD
                      src="https://i.postimg.cc/CM6M970X/96c466ee-7a99-42f1-80a0-14c0a763594a.jpg"
=======
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70"
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
                      alt="Financial planning dashboard"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-5 shadow-xl animate-float border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Instant Results</p>
                        <p className="text-gray-400 text-xs">Real-time calculations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── FAQ SECTION ───────── */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center reveal">
              <span className="inline-block text-brand-accent font-bold text-sm uppercase tracking-widest mb-3">FAQs</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked <span className="text-brand-secondary">Questions</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="divide-y-2 divide-gray-200">
                {faqs.map((faq, i) => (
                  <div key={i} className="py-8">
                    <dt className="text-lg">
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-start justify-between w-full text-left text-gray-400">
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        <span className="ml-6 h-7 flex items-center">
                          {openFaq === i ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                        </span>
                      </button>
                    </dt>
                    {openFaq === i && (
                      <dd className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.a}</p>
                      </dd>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
