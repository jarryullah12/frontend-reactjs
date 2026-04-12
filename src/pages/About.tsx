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

      {/* Team */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('about.team.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('about.team.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
