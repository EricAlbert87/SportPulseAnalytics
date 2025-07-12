// backend/utils/puppeteerSetup.js

const puppeteer = require("puppeteer");

/**
 * Lance une instance de navigateur Puppeteer avec des options sécurisées.
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function lancerNavigateur() {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Utilisez true pour la production si besoin
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