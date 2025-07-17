import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import NHLStats from '../components/NHLStats';
import NFLStats from '../components/NFLStats';
import GolfStats from '../components/GolfStats';
import TennisStats from '../components/TennisStats';

function Dashboard() {
  const { t } = useTranslation();
  const tabs = ['nhl', 'nfl', 'golf', 'tennis'];
  const [activeTab, setActiveTab] = useState('nhl');
  const [filters, setFilters] = useState({
    year: '',
    player: '',
    team: '',
    statCategory: ''
  });

  useEffect(() => {
    // Fetch or filter data when filters change (to be implemented)
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="flex flex-wrap space-x-4 mb-4 border-b-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition-colors duration-200 ease-in-out rounded-t-md ${
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
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">{t('dashboard.filters.year')}</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <input
          name="player"
          value={filters.player}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder={t('dashboard.filters.player')}
        />
        <input
          name="team"
          value={filters.team}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder={t('dashboard.filters.team')}
        />
        <select
          name="statCategory"
          value={filters.statCategory}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">{t('dashboard.filters.statCategory')}</option>
          <option value="goals">{t('dashboard.filters.goals')}</option>
          <option value="wins">{t('dashboard.filters.wins')}</option>
          <option value="points">{t('dashboard.filters.points')}</option>
          <option value="rank">{t('dashboard.filters.rank')}</option>
        </select>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'nhl' && <NHLStats filters={filters} />}
        {activeTab === 'nfl' && <NFLStats filters={filters} />}
        {activeTab === 'golf' && <GolfStats filters={filters} />}
        {activeTab === 'tennis' && <TennisStats filters={filters} />}
      </div>
    </div>
  );
}

export default Dashboard;
