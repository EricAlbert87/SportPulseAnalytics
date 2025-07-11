// backend/utils/puppeteerSetup.js

const puppeteer = require("puppeteer");

async function lancerNavigateur() {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Or use: true (for production headless)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu"
      ],
    });
    return browser;
  } catch (error) {
    console.error("❌ Erreur lors du lancement de Puppeteer :", error);
    throw error;
  }
}

module.exports = { lancerNavigateur };
