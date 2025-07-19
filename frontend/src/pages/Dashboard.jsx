import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    tennis: [],
    golf: [],
    nhl: [],
    nfl: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:3001/tennis').then(res => res.json()),
          fetch('http://localhost:3001/golf').then(res => res.json()),
          fetch('http://localhost:3001/nhl').then(res => res.json()),
          fetch('http://localhost:3001/nfl').then(res => res.json()),
        ]);
        setStats({
          tennis: responses[0],
          golf: responses[1],
          nhl: responses[2],
          nfl: responses[3],
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const renderTable = (data, headers) => (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="bg-navy-900 text-white p-2 border">{t(`dashboard.${header.toLowerCase()}`)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => (
          <tr key={index} className="border-t">
            {headers.map((header, i) => (
              <td key={i} className="p-2 border">{player[header.toLowerCase()] || 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('dashboard.title')}</h2>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('dashboard.tennis')}</h3>
        {renderTable(stats.tennis, ['Rang', 'Nom', 'Pays', 'Points', 'Tournois'])}
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('dashboard.golf')}</h3>
        {renderTable(stats.golf, ['Rang', 'Nom', 'Pays', 'Evenements', 'Points', 'Gains'])}
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('dashboard.nhl')}</h3>
        {renderTable(stats.nhl, ['Rang', 'Nom', 'Equipe', 'Points', 'Matchs', 'Buts'])}
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">{t('dashboard.nfl')}</h3>
        {renderTable(stats.nfl, ['Rang', 'Nom', 'Equipe', 'Yards', 'Touchdowns', 'Matchs'])}
      </section>
    </div>
  );
}

export default Dashboard;