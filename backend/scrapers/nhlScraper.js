const puppeteer = require("puppeteer");

async function obtenirStatsNHL(maxRetries = 3) {
  let browser;
  const url = "https://www.nhl.com/stats/skaters";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        timeout: 180000,
        protocolTimeout: 300000, // 5-minute protocol timeout
      });
      const page = await browser.newPage();
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

      console.log(`Attempt ${attempt} to scrape NHL stats at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 180000 });
      await page.waitForFunction(() => document.querySelector("table tbody")?.querySelectorAll("tr").length > 0, { timeout: 180000 });

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

      console.log("Successfully scraped NHL stats");
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

function startLiveNHLStats() {
  let latestStats = [];
  setInterval(async () => {
    try {
      const stats = await obtenirStatsNHL();
      if (stats.length > 0) latestStats = stats;
      console.log("NHL stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    } catch (error) {
      console.error("❌ Failed to update NHL stats:", error.message);
    }
  }, 60000);
  return () => latestStats;
}

module.exports = { obtenirStatsNHL, startLiveNHLStats };