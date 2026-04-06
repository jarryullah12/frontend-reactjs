import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import urTranslation from './locales/ur.json';
import deTranslation from './locales/de.json';
import esTranslation from './locales/es.json';
import arTranslation from './locales/ar.json';
import frTranslation from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ur: { translation: urTranslation },
      de: { translation: deTranslation },
      es: { translation: esTranslation },
      ar: { translation: arTranslation },
      fr: { translation: frTranslation },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
