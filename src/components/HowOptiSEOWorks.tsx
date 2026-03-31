import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, TabletSmartphone, Smartphone, Zap } from 'lucide-react';

export function HowOptiSEOWorks() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How OptiSEO SEO Tools Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover how our SEO tools work seamlessly across different devices to help you rank your website higher.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
              <motion.img 
                src="https://i.postimg.cc/TPYFg1XR/Ho-Qi1.jpg" 
                alt="OptiSEO Responsive Design" 
                className="w-full h-auto rounded-xl"
                referrerPolicy="no-referrer"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-[#4f39f6] text-white p-4 rounded-full shadow-lg hidden md:block"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Seamless Experience on Every Device
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                OptiSEO tools are designed to work perfectly on any device. Whether you're in the office or on the go, your SEO performance is always at your fingertips.
              </p>
            </div>

            <div className="space-y-6">
              {/* Desktop */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Desktop & Laptop</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Generate detailed SEO analysis, in-depth keyword research, and comprehensive reports on a large screen. Enjoy a premium interface and fast processing for professional work.
                  </p>
                </div>
              </div>

              {/* Tablet */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg shrink-0">
                  <TabletSmartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tablet</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Easy navigation on tablets with a touch-friendly design. Perfect for showing live SEO data and website audits during client meetings or presentations.
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Quick access anywhere, anytime. Check your website rankings, find quick SEO errors, and manage your tasks easily with a fully responsive mobile layout.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
