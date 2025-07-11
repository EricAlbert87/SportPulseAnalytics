// backend/scrapers/nflScraper.js

const puppeteer = require("puppeteer");

async function obtenirStatsNFL() {
  const url = "https://www.espn.com/nfl/stats/player";

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the table to appear
    await page.waitForSelector("table tbody");

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));

      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim(),                  // Rank
          nom: cells[1]?.innerText.trim(),                   // Player name
          equipe: cells[2]?.innerText.trim(),                // Team abbreviation
          position: cells[3]?.innerText.trim(),              // Position
          matchs: cells[4]?.innerText.trim(),                // Games played
          verges: cells[5]?.innerText.trim(),                // Yards (passing, rushing, etc.)
          tds: cells[6]?.innerText.trim(),                   // Touchdowns
          interceptions: cells[7]?.innerText.trim() || "-"   // Interceptions (if available)
        };
      });
    });

    await browser.close();
    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques NFL :", error);
    await browser.close();
    throw error;
  }
}

module.exports = obtenirStatsNFL;
