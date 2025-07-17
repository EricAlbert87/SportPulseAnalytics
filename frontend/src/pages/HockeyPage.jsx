import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchStats } from "../api/fetchStats";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function HockeyPage() {
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [season, setSeason] = useState("2025");
  const [nameFilter, setNameFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await fetchStats("nhl");
      const mapped = data.map((p) => ({
        rank: p.rang,
        name: p.nom,
        team: p.equipe,
        gamesPlayed: p.matchs,
        goals: p.buts,
        assists: p.aides,
        points: p.points,
        plusMinus: p.pm,
      }));
      setPlayers(mapped);
      setFilteredPlayers(mapped);
      setIsLoading(false);
    }
    fetchData();
  }, [season]);

  useEffect(() => {
    let filtered = players;
    if (nameFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        (p.name || "").toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (teamFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        (p.team || "").toLowerCase().includes(teamFilter.toLowerCase())
      );
    }
    setFilteredPlayers(filtered);
  }, [nameFilter, teamFilter, players]);

  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "team", label: t("common.team") },
    { key: "gamesPlayed", label: t("common.gamesPlayed") },
    { key: "goals", label: t("common.goals") },
    { key: "assists", label: t("common.assists") },
    { key: "points", label: t("common.points") },
    { key: "plusMinus", label: "+/-" },
  ];

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-navy-900 font-roboto mb-8">NHL Live Statistics</h1>
      <div className="flex flex-wrap gap-6 mb-8">
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        >
          {["2025", "2024", "2023", "2022", "2021"].map((s) => (
            <option key={s} value={s}>{t("common.selectSeason")} {s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder={t("common.filterByPlayer")}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        />
        <input
          type="text"
          placeholder={t("common.filterByTeam")}
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        />
      </div>
      {isLoading ? (
        <LoadingSpinner text={t("common.loading")} />
      ) : (
        <>
          <StatTable title={t("common.stats")} columns={columns} data={filteredPlayers} />
          <div className="mt-12">
            <BarChartCustom
              title={t("charts.topScorers")}
              data={filteredPlayers
                .slice()
                .sort((a, b) => (parseInt(b.points) || 0) - (parseInt(a.points) || 0))
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="points"
              barColor="#2563EB"
            />
          </div>
        </>
      )}
    </section>
  );
}

export default HockeyPage;