import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Search, FileText, Zap, Shield, BarChart, PenTool, 
  CheckCircle2, ArrowRight, Star, Users, Sparkles, Target,
  Plus, Minus, Clock, X
} from 'lucide-react';

import { HowOptiSEOWorks } from '../components/HowOptiSEOWorks';
import { SEO } from '../components/SEO';
import { useAuthStore } from '@/store';

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, subscription } = useAuthStore();
  const targetRef = useRef(null);
  const [url, setUrl] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [bannerVisible, setBannerVisible] = useState(true);

  const isTrialActive = () => {
    if (subscription?.isActive) return false; // Don't show trial banner if they have an active subscription
    if (!isAuthenticated || !user) return false; // Only show if authenticated
    const joinDateStr = user.joinDate || user.created_at || user.join_date;
    if (!joinDateStr) return true;
    const joinDate = new Date(joinDateStr);
    const daysSinceJoin = (Date.now() - joinDate.getTime()) / (1000 * 3600 * 24);
    return daysSinceJoin <= 7;
  };

  const features = [
    {
      icon: <Search className="w-6 h-6 text-[#4f39f6]" />,
      title: t('features.seo_analysis.title'),
      description: t('features.seo_analysis.desc')
    },
    {
      icon: <PenTool className="w-6 h-6 text-[#4f39f6]" />,
      title: t('features.ai_content.title'),
      description: t('features.ai_content.desc')
    },
    {
      icon: <Zap className="w-6 h-6 text-[#4f39f6]" />,
      title: t('features.fast.title'),
      description: t('features.fast.desc')
    },
    {
      icon: <Shield className="w-6 h-6 text-[#4f39f6]" />,
      title: t('features.secure.title'),
      description: t('features.secure.desc')
    }
  ];

  const popularTools = [
    { name: t('popular_tools_items.meta.name'), category: t('popular_tools_items.meta.category'), icon: <FileText className="w-5 h-5" />, link: "/tools/meta-tag-generator" },
    { name: t('popular_tools_items.blog.name'), category: t('popular_tools_items.blog.category'), icon: <PenTool className="w-5 h-5" />, link: "/tools/ai-blog-generator" },
    { name: t('popular_tools_items.keyword.name'), category: t('popular_tools_items.keyword.category'), icon: <BarChart className="w-5 h-5" />, link: "/tools/keyword-density" },
    { name: t('popular_tools_items.speed.name'), category: t('popular_tools_items.speed.category'), icon: <Zap className="w-5 h-5" />, link: "/tools/speed-test" },
  ];

  return (
    <div className="flex flex-col">
      <SEO 
        title="Free SEO Tools & AI Content Generator" 
        description="Boost your website's ranking with our comprehensive suite of free SEO tools, AI content generators, and website analyzers."
        keywords="SEO tools, AI content generator, website analyzer, free SEO, keyword research, backlink checker"
      />

      {/* 7-Days Free Trial Banner */}
      <AnimatePresence>
        {isTrialActive() && bannerVisible && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-[#4f39f6] to-purple-600 text-white py-3 px-4 text-center relative z-20"
          >
            <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base font-medium">
              <Clock className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              <span>
                Start your <strong className="font-bold text-amber-300">7-Days Free Trial</strong> today and get access to 10 essential SEO tools!
              </span>
              <Link to="/pricing" className="ml-2 underline hover:text-amber-200 transition-colors">
                View Plans
              </Link>
              <button onClick={() => setBannerVisible(false)} className="ml-4 hover:text-white/80">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden bg-white dark:bg-gray-950">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#4f39f6]/5 dark:bg-[#4f39f6]/10 blur-3xl" />
          <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              style={{ y: yText, opacity }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Platform Badge Removed */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-[1.1]">
                  <span className="bg-gradient-to-r from-[#4f39f6] to-purple-600 bg-clip-text text-transparent">
                    {t('hero.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                
                <div className="flex gap-2 mb-8 max-w-lg">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL (e.g., example.com)"
                    className="flex-1 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] outline-none"
                  />
                  <button
                    onClick={() => navigate(`/tools/website-analyzer?url=${encodeURIComponent(url)}`)}
                    className="px-6 py-4 bg-[#4f39f6] text-white rounded-xl font-semibold hover:bg-[#4f39f6]/90 transition-all shadow-lg shadow-[#4f39f6]/20 flex items-center gap-2"
                  >
                    Analyze <Search className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#4f39f6]" />
                    <span>{t('hero.no_card')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#4f39f6]" />
                    <span>{t('hero.free_tools')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated Image/Graphic */}
            <motion.div
              style={{ y: yImage, opacity }}
              className="relative hidden lg:block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-square max-w-[500px] mx-auto"
              >
                {/* Main Dashboard Mockup */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col"
                >
                  {/* Browser Header */}
                  <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2 bg-gray-50 dark:bg-gray-950">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <div className="ml-4 flex-1 h-6 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 flex items-center px-3">
                      <div className="w-3 h-3 text-gray-400"><Search className="w-3 h-3" /></div>
                      <div className="ml-2 w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </div>
                  </div>
                  {/* Dashboard Content */}
                  <div className="flex-1 p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-2" />
                        <div className="w-48 h-8 bg-gradient-to-r from-[#4f39f6] to-purple-500 rounded-lg opacity-20" />
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-[#4f39f6] border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    {/* Chart */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-end gap-2">
                      {[40, 70, 45, 90, 65, 100, 85].map((height, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-[#4f39f6] to-purple-400 rounded-t-sm opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                    <BarChart className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">+145%</div>
                    <div className="text-xs text-gray-500">{t('hero.traffic_score')}</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                  <div className="p-2 bg-[#4f39f6]/10 text-[#4f39f6] rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">99/100</div>
                    <div className="text-xs text-gray-500">{t('hero.seo_health')}</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-1/2 -right-12 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <Target className="w-8 h-8 text-purple-500" />
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.img 
            src="https://i.postimg.cc/ZnYfNDNZ/main-page.png" 
            alt="Popular Tools" 
            className="mx-auto mb-8 rounded-2xl shadow-lg"
            referrerPolicy="no-referrer"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('popular.title')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('popular.subtitle')}</p>
            </div>
            <Link to="/tools" className="hidden md:flex items-center gap-2 text-[#4f39f6] font-medium hover:underline">
              {t('popular.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
              <Link key={index} to={tool.link}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer h-full flex flex-col"
                >
                  <div className="w-10 h-10 bg-[#4f39f6]/10 dark:bg-[#4f39f6]/20 text-[#4f39f6] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#4f39f6] transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">{tool.category}</p>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/tools" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              {t('popular.view_all_mobile')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* Video Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See OptiSEO in Action</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Watch how our powerful tools can transform your SEO strategy in minutes.
            </p>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-black aspect-video relative">
            <iframe 
              src="https://go.screenpal.com/player/cOfV1bnTzzO?width=100%&height=100%&ff=1&title=0&controls=1" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              className="absolute inset-0 w-full h-full"
              title="OptiSEO Demo Video"
            ></iframe>
          </div>
        </div>
      </section>

      {/* How OptiSEO Works Section */}
      <HowOptiSEOWorks />

      {/* Social Proof */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-[#4f39f6] to-purple-600 text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080?blur=10')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { count: t('stats.tools_count'), label: t('stats.tools_label') },
              { count: t('stats.content_count'), label: t('stats.content_label') },
              { count: t('stats.users_count'), label: t('stats.users_label') }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.count}</div>
                <div className="text-indigo-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white dark:bg-gray-950"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('home.faq.title')}</h2>
          <div className="space-y-6">
            {(t('home.faq.items', { returnObjects: true }) as { q: string; a: string }[]).map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                <motion.button 
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                  <div className="text-[#4f39f6]">
                    {openFaq === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gradient-to-r from-[#4f39f6] to-purple-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Are You Waiting For?</h2>
          <p className="text-xl md:text-2xl mb-10 text-indigo-100">Try OptiSEO Today!</p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-white text-[#4f39f6] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Get Started Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
