import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from '../CookieConsent';
import { useThemeStore } from '@/store';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  const { theme } = useThemeStore();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 dark:from-gray-950 dark:via-[#0c0a1f] dark:to-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 relative">
      {/* Ambient glowing background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-60 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#4f39f6]/10 dark:bg-[#4f39f6]/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <Header />
      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>
      <Footer />
      
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-[#4f39f6] text-white rounded-full shadow-lg hover:bg-[#4f39f6]/90 transition-colors z-50"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <CookieConsent />
    </div>
  );
}
