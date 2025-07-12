import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function TennisPage() {
  const { t } = useTranslation();

  // State for tennis players
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [nameFilter, setNameFilter] = useState("");

  // Fetch Tennis data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/tennis");
        // Map backend fields to frontend fields
        const mapped = res.data.map((p) => ({
          rank: p.rang,
          name: p.nom,
          country: p.pays,
          points: parseInt(p.points.replace(/,/g, "")) || 0,
          tournamentsPlayed: p.tournois,
        }));
        setPlayers(mapped);
        setFilteredPlayers(mapped);
      } catch (error) {
        console.error("Error loading Tennis data:", error);
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
    setFilteredPlayers(filtered);
  }, [nameFilter, players]);

  // Table columns for tennis stats
  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "country", label: "Country" },
    { key: "points", label: "Points" },
    { key: "tournamentsPlayed", label: "Tournaments Played" }
  ];

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ATP Tennis Player Stats</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
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
            title="Tennis Player Stats Table"
            columns={columns}
            data={filteredPlayers}
          />

          <div className="mt-10">
            <BarChartCustom
              title="Top 10 Tennis Players by Points"
              data={filteredPlayers
                .slice()
                .sort((a, b) => b.points - a.points)
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="points"
              barColor="#8b5cf6" // Tailwind purple-500
            />
          </div>
        </>
      )}
    </section>
  );
}

export default TennisPage;