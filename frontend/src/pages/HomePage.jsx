import React from "react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-navy-900 font-roboto mb-8">{t("pages.welcomeMessage")}</h1>
      <p className="text-gray-600 font-open-sans text-lg mb-6">{t("pages.selectSport")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/nhl" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-3 font-roboto">NHL</h2>
          <p className="text-gray-600 font-open-sans">Explore hockey stats.</p>
        </a>
        <a href="/nfl" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-3 font-roboto">NFL</h2>
          <p className="text-gray-600 font-open-sans">Analyze football performance.</p>
        </a>
        <a href="/golf" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-3 font-roboto">Golf</h2>
          <p className="text-gray-600 font-open-sans">View golf rankings.</p>
        </a>
        <a href="/tennis" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-3 font-roboto">Tennis</h2>
          <p className="text-gray-600 font-open-sans">Track tennis points.</p>
        </a>
      </div>
    </section>
  );
}

export default HomePage;