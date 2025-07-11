// frontend/src/components/ui/LanguageSwitcher.jsx

import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Persist user's choice
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
          i18n.language === "en"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
          i18n.language === "fr"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        FR
      </button>
    </div>
  );
}

export default LanguageSwitcher;
