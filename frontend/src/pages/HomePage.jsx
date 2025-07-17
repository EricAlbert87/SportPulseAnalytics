import React from "react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-5xl font-bold text-navy-900 font-roboto mb-10">Welcome to SportPulse Analytics</h1>
      <p className="text-gray-600 font-open-sans text-xl mb-8">{t("pages.selectSport")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <a href="/nhl" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-4 font-roboto">NHL</h2>
          <p className="text-gray-600 font-open-sans text-lg">Explore hockey stats.</p>
        </a>
        <a href="/nfl" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-4 font-roboto">NFL</h2>
          <p className="text-gray-600 font-open-sans text-lg">Analyze football performance.</p>
        </a>
        <a href="/golf" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-4 font-roboto">Golf</h2>
          <p className="text-gray-600 font-open-sans text-lg">View golf rankings.</p>
        </a>
        <a href="/tennis" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-200">
          <h2 className="text-2xl font-semibold text-navy-900 mb-4 font-roboto">Tennis</h2>
          <p className="text-gray-600 font-open-sans text-lg">Track tennis points.</p>
        </a>
      </div>
    </section>
  );
}

export default HomePage;