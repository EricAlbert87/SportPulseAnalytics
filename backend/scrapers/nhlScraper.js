const puppeteer = require("puppeteer");

async function obtenirStatsNHL() {
  let browser;
  const url = "https://www.nhl.com/stats/skaters";

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    await page.waitForFunction(() => document.querySelector("table tbody")?.querySelectorAll("tr").length > 0);

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim() || "N/A",
          nom: cells[1]?.innerText.trim() || "N/A",
          equipe: cells[2]?.innerText.trim() || "N/A",
          matchs: cells[3]?.innerText.trim() || "0",
          buts: cells[4]?.innerText.trim() || "0",
          aides: cells[5]?.innerText.trim() || "0",
          points: cells[6]?.innerText.trim() || "0",
          pm: cells[7]?.innerText.trim() || "-",
        };
      });
    });

    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques NHL :", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

function startLiveNHLStats() {
  let latestStats = [];
  setInterval(async () => {
    const stats = await obtenirStatsNHL();
    if (stats.length > 0) latestStats = stats;
    console.log("NHL stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  }, 60000); // Refresh every 60 seconds
  return () => latestStats;
}

module.exports = { obtenirStatsNHL, startLiveNHLStats };