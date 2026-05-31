import { motion } from 'motion/react';
import { Target, Users, Zap, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function About() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <SEO 
        title="About Us" 
        description="Learn more about OptiSEO, our mission, and the team behind the best free SEO tools and AI content generators."
        keywords="about OptiSEO, SEO company, AI content team, our mission"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {t('about.title')} <span className="text-[#4f39f6] dark:text-[#4f39f6]">{t('about.title_accent')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>


      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('about.values.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-[#4f39f6] dark:text-[#4f39f6] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('about.values.accuracy_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('about.values.accuracy_desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('about.values.speed_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('about.values.speed_desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('about.values.privacy_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('about.values.privacy_desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('about.values.community_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('about.values.community_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story & E-E-A-T Commitment */}
      <section className="py-24 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story & Commitment to Quality (E-E-A-T)</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              OptiSEO was founded with a single mission: to democratize access to high-quality SEO and digital marketing tools. We believe that everyone, from solo bloggers to enterprise teams, should have the data and insights they need to succeed online without exorbitant costs.
            </p>
            <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Experience & Expertise</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Our tools are meticulously crafted by a team of seasoned SEO professionals, data scientists, and full-stack engineers with over a decade of combined experience in the digital marketing landscape. Every algorithm, analysis metric, and AI prompt used in our platform has been rigorously tested against industry standards and search engine guidelines.
            </p>
            <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Authoritativeness & Trustworthiness</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Trust is the foundation of our platform. We process millions of data points securely, ensuring user data privacy and upholding strict data protection policies. We do not sell your personal data. We regularly update our tools to align with the latest Google Core Updates, providing you with actionable, reliable, and authoritative recommendations.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-8">
              <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Editorial & Operational Guidelines</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                <li>All data reported by our tools is fetched in real-time or from highly reliable databases.</li>
                <li>Content generated by our AI tools acts as a powerful assistant but emphasizes human review and refinement.</li>
                <li>We maintain full transparency regarding our premium and free features.</li>
                <li>Our operations are compliant with GDPR and international data privacy regulations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Transparency */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Meet the Founder</h2>
              <h3 className="text-2xl font-semibold mb-2 text-[#4f39f6]">Muhammad Jarry Ullah</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Muhammad Jarry Ullah is a passionate SEO specialist and software engineer dedicated to building tools that empower creators and businesses. With years of hands-on experience optimizing websites and architecting robust web applications, Jarryullah recognized the need for a comprehensive, all-in-one platform that bridges the gap between technical SEO and actionable insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <span>Certified SEO Professional & Web Developer</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Target className="w-5 h-5 text-indigo-500" />
                  <span>Committed to Transparent, High-Impact Solutions</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Company Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Company Name</h4>
                  <p className="text-gray-900 dark:text-white font-medium">OptiSEO Inc.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Contact Email</h4>
                  <p className="text-[#4f39f6]">support@getoptiseo.com</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
