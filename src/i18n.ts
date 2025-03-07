import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Optional: import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  // Optional: .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Standardsprache
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
