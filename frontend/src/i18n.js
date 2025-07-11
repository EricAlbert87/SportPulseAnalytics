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
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",          // Default language if detection fails
    debug: false,               // Set to true for debug info in console
    interpolation: {
      escapeValue: false,       // React already escapes by default
    },
    detection: {
      // Order and from where user language should be detected
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],

      // Cache user language on
      caches: ["localStorage", "cookie"],

      // Optional expire and domain for cookie
      cookieMinutes: 10080, // 7 days
      cookieDomain: window.location.hostname,
    },
  });

export default i18n;
