const express = require('express');
const path = require('path');
const tennisScraper = require('./scrapers/tennisScraper');
const golfScraper = require('./scrapers/golfScraper');
const nhlScraper = require('./scrapers/nhlScraper');
const nflScraper = require('./scrapers/nflScraper');

const app = express();

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// API endpoints for sports stats
app.get('/tennis', (req, res) => {
  try {
    const stats = tennisScraper.startLiveTennisStats()();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tennis stats' });
  }
});

app.get('/golf', (req, res) => {
  try {
    const stats = golfScraper.startLiveGolfStats()();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch golf stats' });
  }
});

app.get('/nhl', (req, res) => {
  try {
    const stats = nhlScraper.startLiveNHLStats()();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NHL stats' });
  }
});

app.get('/nfl', (req, res) => {
  try {
    const stats = nflScraper.startLiveNFLStats()();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NFL stats' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  // Initialize live stats updates for all scrapers
  tennisScraper.startLiveTennisStats();
  golfScraper.startLiveGolfStats();
  nhlScraper.startLiveNHLStats();
  nflScraper.startLiveNFLStats();
});