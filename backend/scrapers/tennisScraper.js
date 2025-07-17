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

      console.log(`Attempt ${attempt} to scrape Tennis stats at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
      await page.waitForFunction(() => {
        const table = document.querySelector(".rankings-table tbody"); // Adjusted selector
        return table && table.querySelectorAll("tr").length > 0;
      }, { timeout: 120000 });

      const joueurs = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll(".rankings-table tbody tr"));
        console.log(`Found ${rows.length} rows in the table`);
        const players = rows.map(row => {
          const cells = row.querySelectorAll("td");
          if (cells.length < 6) return null; // Ensure enough columns
          return {
            rang: cells[0]?.innerText.trim() || "N/A",
            nom: cells[1]?.querySelector(".player-cell a")?.innerText.trim() || cells[1]?.innerText.trim() || "N/A", // Target player name link
            pays: cells[2]?.querySelector("img")?.alt || cells[2]?.innerText.trim() || "N/A",
            points: cells[3]?.innerText.trim().replace(/,/g, "") || "0",
            tournois: cells[4]?.innerText.trim() || "0",
          };
        }).filter(player => player !== null);
        console.log(`Sample player: ${players[0]?.nom} (${players[0]?.pays})`);
        return players;
      });

      if (joueurs.length === 0) throw new Error("No valid player data extracted");
      console.log("Successfully scraped Tennis stats");
      return joueurs;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 15000 * attempt));
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