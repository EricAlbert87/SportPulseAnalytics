// backend/scrapers/nhlScraper.js

const puppeteer = require("puppeteer");

async function obtenirStatsNHL() {
  const url = "https://www.nhl.com/stats/skaters";

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    // Wait for the stats table
    await page.waitForSelector("table tbody");

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim(),             // Rank
          nom: cells[1]?.innerText.trim(),              // Player Name
          equipe: cells[2]?.innerText.trim(),           // Team
          matchs: cells[3]?.innerText.trim(),           // Games Played
          buts: cells[4]?.innerText.trim(),             // Goals
          aides: cells[5]?.innerText.trim(),            // Assists
          points: cells[6]?.innerText.trim(),           // Points
          pm: cells[7]?.innerText.trim() || "-",        // Plus/Minus
        };
      });
    });

    await browser.close();
    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques NHL :", error);
    await browser.close();
    throw error;
  }
}

module.exports = obtenirStatsNHL;
