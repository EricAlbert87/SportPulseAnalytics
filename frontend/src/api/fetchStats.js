import axios from "axios";

export const fetchStats = async (sport) => {
  try {
    const res = await axios.get(`http://localhost:3001/${sport}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${sport} stats:`, error);
    return [];
  }
};