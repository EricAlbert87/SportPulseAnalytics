import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from '../public/locales/en/translation.json';
import translationFR from '../public/locales/fr/translation.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR }
};

i18n
  .use(LanguageDetector) // Automatically detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
