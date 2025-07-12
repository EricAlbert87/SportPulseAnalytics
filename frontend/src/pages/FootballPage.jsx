import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function FootballPage() {
  const { t } = useTranslation();

  // State for all NFL players data
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [teamFilter, setTeamFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  // Fetch NFL data from backend API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/nfl");
        // Map backend fields to frontend fields
        const mapped = res.data.map((p) => ({
          rank: p.rang,
          name: p.nom,
          team: p.equipe,
          position: p.position,
          gamesPlayed: p.matchs,
          yards: p.verges,
          touchdowns: p.tds,
          interceptions: p.interceptions,
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

  // Filtering logic
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

  // Table columns for NFL stats
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
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">NFL Player Stats</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Team"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="p-2 border rounded w-48"
        />
        <input
          type="text"
          placeholder="Filter by Player Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 border rounded w-48"
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

          <div className="mt-10">
            <BarChartCustom
              title="Top 10 NFL Players by Touchdowns"
              data={filteredPlayers
                .slice()
                .sort((a, b) => (parseInt(b.touchdowns) || 0) - (parseInt(a.touchdowns) || 0))
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="touchdowns"
              barColor="#EF4444" // red accent for NFL
            />
          </div>
        </>
      )}
    </section>
  );
}

export default FootballPage;