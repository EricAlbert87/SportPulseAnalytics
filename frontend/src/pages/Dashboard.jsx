import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NHLStats from '../components/NHLStats';
import NFLStats from '../components/NFLStats';
import GolfStats from '../components/GolfStats';
import TennisStats from '../components/TennisStats';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Optional toggle

function Dashboard() {
  const { t } = useTranslation();
  const tabs = ['nhl', 'nfl', 'golf', 'tennis'];
  const [activeTab, setActiveTab] = useState('nhl');

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Top Bar with Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {t(`dashboard.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select className="p-2 border rounded">
          <option>{t('dashboard.filters.year')}</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <input
          className="p-2 border rounded"
          placeholder={t('dashboard.filters.player')}
        />
        <input
          className="p-2 border rounded"
          placeholder={t('dashboard.filters.team')}
        />
        <select className="p-2 border rounded">
          <option>{t('dashboard.filters.statCategory')}</option>
          <option>{t('dashboard.filters.goals')}</option>
          <option>{t('dashboard.filters.wins')}</option>
          <option>{t('dashboard.filters.points')}</option>
          <option>{t('dashboard.filters.rank')}</option>
        </select>
      </div>

      {/* Stats Content */}
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
