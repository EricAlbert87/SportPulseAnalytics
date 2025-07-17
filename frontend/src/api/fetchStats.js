import axios from "axios";

// Define your API base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

/**
 * Fetch stats from a specific sport endpoint.
 * @param {string} sport - The sport key (e.g., "nfl", "nhl", "golf", "tennis")
 * @returns {Promise<Array>} - Array of player stats
 */
export async function fetchStats(sport) {
  try {
    const response = await axios.get(`${BASE_URL}/${sport}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des stats pour ${sport} :`, error);
    return [];
  }
}