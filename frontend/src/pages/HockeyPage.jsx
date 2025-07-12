import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function HockeyPage() {
  const { t } = useTranslation();

  // States
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  // Fetch NHL data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/nhl");
        // Map backend fields to frontend fields
        const mapped = res.data.map((p) => ({
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
      } catch (error) {
        console.error("Error loading NHL data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtering logic
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

  // NHL table columns
  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "team", label: t("common.team") },
    { key: "gamesPlayed", label: "Games Played" },
    { key: "goals", label: t("common.goals") },
    { key: "assists", label: t("common.assists") },
    { key: "points", label: t("common.points") },
    { key: "plusMinus", label: "+/-" }
  ];

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">NHL Player Stats</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Player Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 border rounded w-48"
        />
        <input
          type="text"
          placeholder="Filter by Team"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="p-2 border rounded w-48"
        />
      </div>

      {isLoading ? (
        <LoadingSpinner text={t("common.loading")} />
      ) : (
        <>
          <StatTable
            title="NHL Player Stats Table"
            columns={columns}
            data={filteredPlayers}
          />

          <div className="mt-10">
            <BarChartCustom
              title="Top 10 NHL Players by Points"
              data={filteredPlayers
                .slice()
                .sort((a, b) => (parseInt(b.points) || 0) - (parseInt(a.points) || 0))
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="points"
              barColor="#2563EB" // Tailwind blue-600
            />
          </div>
        </>
      )}
    </section>
  );
}

export default HockeyPage;
