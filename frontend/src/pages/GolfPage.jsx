import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function GolfPage() {
  const { t } = useTranslation();

  // State for golf players data
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // Fetch Golf data from backend API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/golf");
        setPlayers(res.data);
        setFilteredPlayers(res.data);
      } catch (error) {
        console.error("Error loading Golf data:", error);
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
        p.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (yearFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.year.toString().includes(yearFilter)
      );
    }
    setFilteredPlayers(filtered);
  }, [nameFilter, yearFilter, players]);

  // Columns for golf stats table
  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "country", label: "Country" },
    { key: "fedexCupPoints", label: "FedEx Cup Points" },
    { key: "eventsPlayed", label: "Events Played" },
    { key: "wins", label: "Wins" },
    { key: "top10Finishes", label: "Top 10 Finishes" },
    { key: "year", label: t("common.year") }
  ];

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PGA Tour Player Stats</h1>

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
          placeholder="Filter by Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="p-2 border rounded w-32"
        />
      </div>

      {isLoading ? (
        <LoadingSpinner text={t("common.loading")} />
      ) : (
        <>
          <StatTable
            title="Golf Player Stats Table"
            columns={columns}
            data={filteredPlayers}
          />

          <div className="mt-10">
            <BarChartCustom
              title="Top 10 Players by FedEx Cup Points"
              data={filteredPlayers
                .sort((a, b) => b.fedexCupPoints - a.fedexCupPoints)
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="fedexCupPoints"
              barColor="#22c55e" // Tailwind green-500 for golf
            />
          </div>
        </>
      )}
    </section>
  );
}

export default GolfPage;
