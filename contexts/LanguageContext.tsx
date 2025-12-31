<<<<<<< HEAD
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
=======
import React, { createContext, useState, useContext, ReactNode } from 'react';
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
import { translations } from '../utils/translations';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
<<<<<<< HEAD
  t: (key: string, params?: Record<string, any>) => any;
=======
  t: (key: string) => string;
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
<<<<<<< HEAD
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
    
=======
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
      current = current[key];
    }
<<<<<<< HEAD

    if (typeof current === 'string' && params) {
      let result = current;
      Object.entries(params).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      return result;
    }

=======
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    return current;
  };

  return (
<<<<<<< HEAD
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
=======
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};