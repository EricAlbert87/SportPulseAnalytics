// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="px-3 py-1 border rounded">
      {i18n.language === 'en' ? 'Français' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
