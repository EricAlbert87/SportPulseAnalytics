const puppeteer = require("puppeteer");

async function obtenirStatsTennis() {
  let browser;
  const url = "https://www.atptour.com/en/rankings/singles";

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    await page.waitForFunction(() => document.querySelector(".mega-table tbody")?.querySelectorAll("tr").length > 0);

    const joueurs = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".mega-table tbody tr"));
      return rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
          rang: cells[0]?.innerText.trim() || "N/A",
          nom: cells[3]?.innerText.trim() || "N/A",
          pays: cells[4]?.querySelector("img")?.alt || "N/A",
          points: cells[5]?.innerText.trim() || "0",
          tournois: cells[6]?.innerText.trim() || "0",
        };
      });
    });

    return joueurs;
  } catch (error) {
    console.error("❌ Erreur lors du scraping des statistiques de Tennis :", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

function startLiveTennisStats() {
  let latestStats = [];
  setInterval(async () => {
    const stats = await obtenirStatsTennis();
    if (stats.length > 0) latestStats = stats;
    console.log("Tennis stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  }, 60000); // Refresh every 60 seconds
  return () => latestStats;
}

module.exports = { obtenirStatsTennis, startLiveTennisStats };