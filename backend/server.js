const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const {
  fetchNFL,
  fetchNHL,
  fetchGolf,
  fetchTennis,
} = require("./controllers/apiController");

app.use(cors());
app.use(express.json());

app.get("", (req, res) => {
  res.send("🏈🏒⛳🎾 Bienvenue à l'API Analytiques SportPulse!");
});

// Utilise les contrôleurs centralisés pour chaque sport
app.get("/api/nfl", fetchNFL);
app.get("/api/nhl", fetchNHL);
app.get("/api/golf", fetchGolf);
app.get("/api/tennis", fetchTennis);

app.listen(PORT, () => {
  console.log(`✅ Serveur en marche à l'adresse : http://localhost:${PORT}`);
});