const puppeteer = require("puppeteer");

async function obtenirStatsGolf(maxRetries = 3) {
  let browser;
  const url = "https://www.pgatour.com/fedexcup/standings";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-blink-features=AutomationControlled"],
        timeout: 600000,
        protocolTimeout: 600000,
      });
      const page = await browser.newPage();
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
      await page.setViewport({ width: 1280, height: 800 });

      console.log(`Attempt ${attempt} to scrape Golf stats at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 600000 });
      await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 5000) + 20000)); // Random delay 20-25s
      await page.click('#onetrust-accept-btn-handler', { timeout: 30000 }).catch(() => {});
      await page.waitForFunction(() => document.readyState === 'complete', { timeout: 600000 });
      await page.waitForSelector(".table-leaderboard tbody tr", { timeout: 600000 });

      const joueurs = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll(".table-leaderboard tbody tr"));
        console.log(`Found ${rows.length} rows in the table`);
        const players = rows.map(row => {
          const cells = row.querySelectorAll("td");
          if (cells.length < 6) return null;
          return {
            rang: cells[0]?.innerText.trim() || "N/A",
            nom: cells[1]?.innerText.trim() || "N/A",
            pays: cells[2]?.querySelector("img")?.alt || cells[2]?.innerText.trim() || "N/A",
            evenements: cells[3]?.innerText.trim() || "0",
            points: cells[4]?.innerText.trim().replace(/,/g, "") || "0",
            gains: cells[5]?.innerText.trim().replace(/,/g, "") || "0",
          };
        }).filter(player => player !== null);
        return players;
      });

      if (joueurs.length === 0) throw new Error("No valid player data extracted after processing rows");
      console.log("Successfully scraped Golf stats");
      return joueurs;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 30000 * attempt));
    } finally {
      if (browser) await browser.close();
    }
  }
}

function startLiveGolfStats() {
  let latestStats = [];
  setInterval(async () => {
    try {
      const stats = await obtenirStatsGolf();
      if (stats.length > 0) latestStats = stats;
      console.log("Golf stats updated at", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    } catch (error) {
      console.error("❌ Failed to update Golf stats:", error.message);
    }
  }, 60000);
  return () => latestStats;
}

if (require.main === module) {
  (async () => {
    const stats = await obtenirStatsGolf();
    console.log("Scraped stats:", stats);
  })();
}

module.exports = { obtenirStatsGolf, startLiveGolfStats };