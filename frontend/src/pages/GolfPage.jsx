import React, { useEffect, useState } from "react";
import axios from "axios";
import StatTable from "../components/ui/StatTable";
import BarChartCustom from "../components/charts/BarChartCustom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";

function GolfPage() {
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3001/golf");
        const mapped = res.data.map((p) => ({
          rank: p.rang,
          name: p.nom,
          country: p.pays,
          fedexCupPoints: parseInt(p.points.replace(/,/g, "")) || 0,
          eventsPlayed: p.evenements,
          earnings: p.gains,
        }));
        setPlayers(mapped);
        setFilteredPlayers(mapped);
      } catch (error) {
        console.error("Error loading Golf data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = players;
    if (nameFilter.trim() !== "") {
      filtered = filtered.filter((p) =>
        (p.name || "").toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    setFilteredPlayers(filtered);
  }, [nameFilter, players]);

  const columns = [
    { key: "rank", label: t("common.rank") },
    { key: "name", label: t("common.player") },
    { key: "country", label: "Country" },
    { key: "fedexCupPoints", label: "FedEx Cup Points" },
    { key: "eventsPlayed", label: "Events Played" },
    { key: "earnings", label: "Earnings" }
  ];

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-navy-900 font-roboto mb-8">PGA Tour Live Statistics</h1>
      <div className="flex flex-wrap gap-6 mb-8">
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
            title="Golf Player Stats Table"
            columns={columns}
            data={filteredPlayers}
          />
          <div className="mt-12">
            <BarChartCustom
              title="Top 10 Players by FedEx Cup Points"
              data={filteredPlayers
                .slice()
                .sort((a, b) => b.fedexCupPoints - a.fedexCupPoints)
                .slice(0, 10)}
              dataKeyX="name"
              dataKeyY="fedexCupPoints"
              barColor="#22c55e"
            />
          </div>
        </>
      )}
    </section>
  );
}

export default GolfPage;