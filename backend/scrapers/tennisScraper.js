// backend/scrapers/tennisScraper.js

const puppeteer = require("puppeteer");

async function obtenirStatsTennis() {
  const url = "https://www.atptour.com/en/rankings/singles";
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    // Wait for the ranking table to be loaded
    await page.waitForSelector(".mega-table tbody");

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".mega-table tbody tr"));

      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim(),              // Rank
          nom: cells[3]?.innerText.trim(),               // Player name
          pays: cells[4]?.querySelector("img")?.alt || "", // Country (from flag alt text)
          points: cells[5]?.innerText.trim(),            // Ranking points
          tournois: cells[6]?.innerText.trim(),          // Tournaments played
        };
      });
    });

    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques de Tennis :", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = obtenirStatsTennis;
