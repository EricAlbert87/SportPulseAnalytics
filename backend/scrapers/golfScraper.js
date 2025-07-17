const puppeteer = require("puppeteer");

async function obtenirStatsGolf() {
  let browser;
  const url = "https://www.pgatour.com/fedexcup";

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForFunction(() => document.querySelector(".fedex-cup-table__table")?.querySelectorAll("tbody tr").length > 0);

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".fedex-cup-table__table tbody tr"));
      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim() || "N/A",
          nom: cells[1]?.innerText.trim() || "N/A",
          pays: cells[2]?.innerText.trim() || "N/A",
          points: cells[3]?.innerText.trim() || "0",
          evenements: cells[4]?.innerText.trim() || "0",
          gains: cells[5]?.innerText.trim() || "0",
        };
      });
    });

    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques de Golf :", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

function startLiveGolfStats() {
  let latestStats = [];
  setInterval(async () => {
    const stats = await obtenirStatsGolf();
    if (stats.length > 0) latestStats = stats;
    console.log("Golf stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  }, 60000); // Refresh every 60 seconds
  return () => latestStats;
}

module.exports = { obtenirStatsGolf, startLiveGolfStats };