import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation JSON files
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
      cookieMinutes: 10080, // 7 days
      // cookieDomain: window.location.hostname, // Omit for localhost/dev compatibility
    },
  });

export default i18n;