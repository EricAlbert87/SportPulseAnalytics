// backend/controllers/apiController.js

const obtenirStatsNFL = require("../scrapers/nflScraper");
const obtenirStatsNHL = require("../scrapers/nhlScraper");
const obtenirStatsGolf = require("../scrapers/golfScraper");
const obtenirStatsTennis = require("../scrapers/tennisScraper");

/**
 * Contrôleur pour récupérer les statistiques NFL
 */
async function fetchNFL(req, res) {
  try {
    const data = await obtenirStatsNFL();
    if (!data) {
      return res.status(404).json({ erreur: "Aucune donnée NFL trouvée." });
    }
    res.json(data);
  } catch (error) {
    console.error("Erreur (NFL) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques NFL." });
  }
}

/**
 * Contrôleur pour récupérer les statistiques NHL
 */
async function fetchNHL(req, res) {
  try {
    const data = await obtenirStatsNHL();
    if (!data) {
      return res.status(404).json({ erreur: "Aucune donnée NHL trouvée." });
    }
    res.json(data);
  } catch (error) {
    console.error("Erreur (NHL) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques NHL." });
  }
}

/**
 * Contrôleur pour récupérer les statistiques de Golf
 */
async function fetchGolf(req, res) {
  try {
    const data = await obtenirStatsGolf();
    if (!data) {
      return res.status(404).json({ erreur: "Aucune donnée Golf trouvée." });
    }
    res.json(data);
  } catch (error) {
    console.error("Erreur (Golf) :", error);
    res.status(500).json({ erreur: "Impossible de récupérer les statistiques de Golf." });
  }
}

/**
 * Contrôleur pour récupérer les statistiques de Tennis
 */
async function fetchTennis(req, res) {
  try {
    const data = await obtenirStatsTennis();
    if (!data) {
      return res.status(404).json({ erreur: "Aucune donnée Tennis trouvée." });
    }
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