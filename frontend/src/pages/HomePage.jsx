import React from "react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-white">{t("pages.welcomeMessage")}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{t("pages.selectSport")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-accent mb-2">NHL</h2>
          <p className="text-gray-600 dark:text-gray-300">Explore hockey stats.</p>
        </div>
        <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-accent mb-2">NFL</h2>
          <p className="text-gray-600 dark:text-gray-300">Analyze football performance.</p>
        </div>
        <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-accent mb-2">Golf</h2>
          <p className="text-gray-600 dark:text-gray-300">View golf rankings.</p>
        </div>
        <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-accent mb-2">Tennis</h2>
          <p className="text-gray-600 dark:text-gray-300">Track tennis points.</p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;