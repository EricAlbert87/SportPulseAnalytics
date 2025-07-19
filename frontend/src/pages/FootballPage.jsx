import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function FootballPage() {
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3001/nfl");
        const mapped = res.data.map((p) => ({
          rank: p.rang,
          name: p.nom,
          team: p.equipe,
          position: p.position || "N/A", // Add if scraper supports it
          gamesPlayed: p.matchs,
          yards: p.verges,
          touchdowns: p.tds,
          interceptions: p.interceptions || "0", // Add if scraper supports it
        }));
        setPlayers(mapped);
        setFilteredPlayers(mapped);
      } catch (error) {
        console.error("Erreur lors du chargement des données NFL :", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = players;
    if (teamFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        (p.team || "").toLowerCase().includes(teamFilter.toLowerCase())
      );
    }
    if (nameFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        (p.name || "").toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    setFilteredPlayers(filtered);
  }, [teamFilter, nameFilter, players]);

  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "team", label: t("common.team") },
    { key: "position", label: "Position" },
    { key: "gamesPlayed", label: "Games Played" },
    { key: "yards", label: "Yards" },
    { key: "touchdowns", label: "Touchdowns" },
    { key: "interceptions", label: "Interceptions" },
  ];

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-navy-900 font-roboto mb-8">NFL Live Statistics</h1>
      <div className="flex flex-wrap gap-6 mb-8">
        <input
          type="text"
          placeholder="Filter by Team"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        />
        <input
          type="text"
          placeholder="Filter by Player Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg w-56 font-open-sans text-lg bg-white text-gray-800"
        />
      </div>
      {isLoading ? (
        <LoadingSpinner text={t("common.loading")} />
      ) : (
        <>
          <StatTable
            title="NFL Player Stats Table"
            columns={columns}
            data={filteredPlayers}
          />
          <div className="mt-12">
            <BarChartCustom
              title="Top 10 NFL Players by Touchdowns"
              data={filteredPlayers
                .slice()
                .sort((a, b) => (parseInt(b.touchdowns) || 0) - (parseInt(a.touchdowns) || 0))
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="touchdowns"
              barColor="#EF4444"
            />
          </div>
        </>
      )}
    </section>
  );
}

export default FootballPage;