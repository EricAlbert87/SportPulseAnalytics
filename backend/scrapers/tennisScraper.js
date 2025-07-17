const puppeteer = require("puppeteer");

async function obtenirStatsTennis(maxRetries = 3) {
  let browser;
  const url = "https://www.atptour.com/en/rankings/singles";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        timeout: 120000,
      });
      const page = await browser.newPage();
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

      console.log(`Attempt ${attempt} to scrap Tennis stats at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
      await page.waitForFunction(() => {
        const table = document.querySelector(".mega-table tbody");
        return table && table.querySelectorAll("tr").length > 0;
      }, { timeout: 120000 });

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

      console.log("Successfully scraped Tennis stats");
      return joueurs;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 15000 * attempt)); // 15s, 30s, 45s backoff
    } finally {
      if (browser) await browser.close();
    }
  }
}

function startLiveTennisStats() {
  let latestStats = [];
  setInterval(async () => {
    try {
      const stats = await obtenirStatsTennis();
      if (stats.length > 0) latestStats = stats;
      console.log("Tennis stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    } catch (error) {
      console.error("❌ Failed to update Tennis stats:", error.message);
    }
  }, 60000);
  return () => latestStats;
}

module.exports = { obtenirStatsTennis, startLiveTennisStats };