import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NHLStats from '../components/NHLStats';
import NFLStats from '../components/NFLStats';
import GolfStats from '../components/GolfStats';
import TennisStats from '../components/TennisStats';
import LanguageSwitcher from '../components/LanguageSwitcher';

function Dashboard() {
  const { t } = useTranslation();
  const tabs = ['nhl', 'nfl', 'golf', 'tennis'];
  const [activeTab, setActiveTab] = useState('nhl');

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-end mb-6">
        <LanguageSwitcher />
      </div>
      <div className="flex space-x-6 mb-6 border-b-2 border-navy-900 pb-3">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-semibold font-open-sans text-lg ${
              activeTab === tab
                ? 'text-navy-900 border-b-2 border-gold-500'
                : 'text-gray-500 hover:text-navy-900'
            } transition duration-300`}
          >
            {t(`dashboard.tabs.${tab}`)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select className="p-3 border border-gray-300 rounded-lg font-open-sans text-base">
          <option>{t('dashboard.filters.year')}</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <input
          className="p-3 border border-gray-300 rounded-lg font-open-sans text-base"
          placeholder={t('dashboard.filters.player')}
        />
        <input
          className="p-3 border border-gray-300 rounded-lg font-open-sans text-base"
          placeholder={t('dashboard.filters.team')}
        />
        <select className="p-3 border border-gray-300 rounded-lg font-open-sans text-base">
          <option>{t('dashboard.filters.statCategory')}</option>
          <option>{t('dashboard.filters.goals')}</option>
          <option>{t('dashboard.filters.wins')}</option>
          <option>{t('dashboard.filters.points')}</option>
          <option>{t('dashboard.filters.rank')}</option>
        </select>
      </div>
      <div>
        {activeTab === 'nhl' && <NHLStats />}
        {activeTab === 'nfl' && <NFLStats />}
        {activeTab === 'golf' && <GolfStats />}
        {activeTab === 'tennis' && <TennisStats />}
      </div>
    </div>
  );
}

export default Dashboard;