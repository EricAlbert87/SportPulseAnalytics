const puppeteer = require("puppeteer");

async function obtenirStatsGolf(maxRetries = 3) {
  let browser;
  const url = "https://www.pgatour.com/fedexcup";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      console.log(`Attempt ${attempt} to scrape Golf stats at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 }); // 60-second timeout
      await page.waitForFunction(() => document.querySelector(".fedex-cup-table__table")?.querySelectorAll("tbody tr").length > 0, { timeout: 60000 });

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

      console.log("Successfully scraped Golf stats");
      return joueurs;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 5000 * attempt)); // Exponential backoff
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
  }, 60000); // Refresh every 60 seconds
  return () => latestStats;
}

module.exports = { obtenirStatsGolf, startLiveGolfStats };