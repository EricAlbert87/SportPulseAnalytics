import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchStats } from "../api/fetchStats";
import StatTable from "../components/ui/StatTable";
import LineChartCustom from "../components/charts/LineChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function TennisPage() {
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await fetchStats("tennis");
      const mapped = data.map((p) => ({
        rank: p.rang,
        name: p.nom,
        country: p.pays,
        points: parseInt(p.points.replace(/,/g, "")) || 0,
        tournamentsPlayed: p.tournois,
      }));
      setPlayers(mapped);
      setFilteredPlayers(mapped);
      setSelectedPlayer(mapped[0]?.name || "");
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const chartData = selectedPlayer
    ? [
        { tournament: "T1", points: players.find(p => p.name === selectedPlayer)?.points || 0 },
        { tournament: "T2", points: (players.find(p => p.name === selectedPlayer)?.points || 0) * 0.9 },
        { tournament: "T3", points: (players.find(p => p.name === selectedPlayer)?.points || 0) * 1.1 },
      ]
    : [];

  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "country", label: t("common.country") },
    { key: "points", label: t("common.points") },
    { key: "tournamentsPlayed", label: t("common.tournamentsPlayed") },
  ];

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-navy-900 font-roboto mb-8">Tennis Live Statistics</h1>
      <div className="flex flex-wrap gap-6 mb-8">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        >
          <option value="">{t("common.selectPlayer")}</option>
          {players.map((p) => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <LoadingSpinner text={t("common.loading")} />
      ) : (
        <>
          <StatTable title={t("common.stats")} columns={columns} data={filteredPlayers} />
          {selectedPlayer && (
            <div className="mt-12">
              <LineChartCustom
                title={`${t("charts.pointsOverTime")} - ${selectedPlayer}`}
                data={chartData}
                dataKeyX="tournament"
                dataKeyY="points"
                lineColor="#8b5cf6"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default TennisPage;