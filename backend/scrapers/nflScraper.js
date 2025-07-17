const puppeteer = require("puppeteer");

async function obtenirStatsNFL() {
  let browser;
  const url = "https://www.espn.com/nfl/stats/player";

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForFunction(() => document.querySelector("table tbody")?.querySelectorAll("tr").length > 0);

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim() || "N/A",
          nom: cells[1]?.innerText.trim() || "N/A",
          equipe: cells[2]?.innerText.trim() || "N/A",
          position: cells[3]?.innerText.trim() || "N/A",
          matchs: cells[4]?.innerText.trim() || "0",
          verges: cells[5]?.innerText.trim() || "0",
          tds: cells[6]?.innerText.trim() || "0",
          interceptions: cells[7]?.innerText.trim() || "-",
        };
      });
    });

    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques NFL :", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

function startLiveNFLStats() {
  let latestStats = [];
  setInterval(async () => {
    const stats = await obtenirStatsNFL();
    if (stats.length > 0) latestStats = stats;
    console.log("NFL stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  }, 60000); // Refresh every 60 seconds
  return () => latestStats;
}

module.exports = { obtenirStatsNFL, startLiveNFLStats };