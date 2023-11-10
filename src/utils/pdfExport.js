const { readFileSync } = require("fs");
const { default: puppeteer } = require("puppeteer");
const fs = require("fs").promises;
const path = require('path');
const { text } = require("express");

exports.pdfExport = async (filePath, html) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const htmlFile = await fs.readFile(html, "utf-8");

  const imagePath = path.resolve(__dirname, '../../public/images/doelay.jpg');

  const imageBase64 = readFileSync(imagePath, { encoding: 'base64' });

  const modifiedHtml = htmlFile.replace('${imageBase64}', imageBase64);

  await page.setContent(modifiedHtml);

  await page.waitForSelector('img');
  await page.waitForTimeout(1000);
  // Generate PDF
  await page.pdf({ path: filePath});

  await browser.close();
};
