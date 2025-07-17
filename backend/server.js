// backend/server.js
const express = require('express');
const { obtenirStatsGolf, startLiveGolfStats } = require('./scrapers/golfScraper');
const { obtenirStatsNHL, startLiveNHLStats } = require('./scrapers/nhlScraper');
const { obtenirStatsNFL, startLiveNFLStats } = require('./scrapers/nflScraper');
const { obtenirStatsTennis, startLiveTennisStats } = require('./scrapers/tennisScraper');

const app = express();
const port = 3001;

const liveGolfStats = startLiveGolfStats();
const liveNHLStats = startLiveNHLStats();
const liveNFLStats = startLiveNFLStats();
const liveTennisStats = startLiveTennisStats();

app.use(express.json());

// API endpoints
app.get('/api/golf', (req, res) => {
  res.json(liveGolfStats());
});

app.get('/api/nhl', (req, res) => {
  res.json(liveNHLStats());
});

app.get('/api/nfl', (req, res) => {
  res.json(liveNFLStats());
});

app.get('/api/tennis', (req, res) => {
  res.json(liveTennisStats());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});