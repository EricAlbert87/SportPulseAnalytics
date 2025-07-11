// backend/scrapers/golfScraper.js

const puppeteer = require("puppeteer");

async function obtenirStatsGolf() {
  const url = "https://www.pgatour.com/fedexcup";

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Attendre le tableau des joueurs
    await page.waitForSelector(".fedex-cup-table__table");

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table.fedex-cup-table__table tbody tr"));

      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim(),
          nom: cells[1]?.innerText.trim(),
          pays: cells[2]?.innerText.trim(),
          points: cells[3]?.innerText.trim(),
          evenements: cells[4]?.innerText.trim(),
          gains: cells[5]?.innerText.trim(),
        };
      });
    });

    await browser.close();
    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques de Golf :", error);
    await browser.close();
    throw error;
  }
}

module.exports = obtenirStatsGolf;
