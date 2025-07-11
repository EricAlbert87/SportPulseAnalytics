const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const getNFLStats = require("./scrapers/nflScraper");
const getNHLStats = require("./scrapers/nhlScraper");
const getGolfStats = require("./scrapers/golfScraper");
const getTennisStats = require("./scrapers/tennisScraper");

app.use(cors());
app.use(express.json());

app.get("", async (req, res) => {
      res.send("🏈🏒⛳🎾 Bienvenue à l'API Analytiques SportPulse!");
});

// Statistiques NFL
app.get("/api/nfl", async (req, res) => {
  try {
    const donnees = await obtenirStatsNFL();
    res.json(donnees);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des stats NFL :", erreur);
    res.status(500).json({ erreur: "Impossible d'obtenir les statistiques NFL" });
  }
});

// Statistiques NHL
app.get("/api/nhl", async (req, res) => {
  try {
    const donnees = await obtenirStatsNHL();
    res.json(donnees);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des stats NHL :", erreur);
    res.status(500).json({ erreur: "Impossible d'obtenir les statistiques NHL" });
  }
});

// Statistiques Golf
app.get("/api/golf", async (req, res) => {
  try {
    const donnees = await obtenirStatsGolf();
    res.json(donnees);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des stats Golf :", erreur);
    res.status(500).json({ erreur: "Impossible d'obtenir les statistiques de Golf" });
  }
});

// Statistiques Tennis
app.get("/api/tennis", async (req, res) => {
  try {
    const donnees = await obtenirStatsTennis();
    res.json(donnees);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des stats Tennis :", erreur);
    res.status(500).json({ erreur: "Impossible d'obtenir les statistiques de Tennis" });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en marche à l'adresse : http://localhost:${PORT}`);
});

// backend/server.js
const {
  fetchNFL,
  fetchNHL,
  fetchGolf,
  fetchTennis,
} = require("./controllers/apiController");

app.get("/api/nfl", fetchNFL);
app.get("/api/nhl", fetchNHL);
app.get("/api/golf", fetchGolf);
app.get("/api/tennis", fetchTennis);

