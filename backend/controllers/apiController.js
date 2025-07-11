// backend/controllers/apiController.js

const obtenirStatsNFL = require("../scrapers/nflScraper");
const obtenirStatsNHL = require("../scrapers/nhlScraper");
const obtenirStatsGolf = require("../scrapers/golfScraper");
const obtenirStatsTennis = require("../scrapers/tennisScraper");

// Contrôleur pour chaque sport

async function fetchNFL(req, res) {
  try {
    const data = await obtenirStatsNFL();
    res.json(data);
  } catch (error) {
    console.error("Erreur (NFL) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques NFL." });
  }
}

async function fetchNHL(req, res) {
  try {
    const data = await obtenirStatsNHL();
    res.json(data);
  } catch (error) {
    console.error("Erreur (NHL) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques NHL." });
  }
}

async function fetchGolf(req, res) {
  try {
    const data = await obtenirStatsGolf();
    res.json(data);
  } catch (error) {
    console.error("Erreur (Golf) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques de Golf." });
  }
}

async function fetchTennis(req, res) {
  try {
    const data = await obtenirStatsTennis();
    res.json(data);
  } catch (error) {
    console.error("Erreur (Tennis) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques de Tennis." });
  }
}

// Exportation des contrôleurs
module.exports = {
  fetchNFL,
  fetchNHL,
  fetchGolf,
  fetchTennis,
};
