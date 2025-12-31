import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../utils/translations';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'de') {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string, params?: Record<string, any>) => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
      current = current[key];
    }

    if (typeof current === 'string' && params) {
      let result = current;
      Object.entries(params).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      return result;
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};