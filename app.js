const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { pdfExport } = require("./src/utils/pdfExport");
const { csvExport } = require("./src/utils/csvExport");
const { excelExport } = require("./src/utils/excelExport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const html = path.join(__dirname, "src", "views", "index.html");

app.post("/api/pdf-export", async (req, res) => {
  try {
    // Get the path to the user's Downloads folder
    const downloadsPath = path.join(os.homedir(), "Downloads");

    // Use a base filename for the PDFs
    const baseFileName = "node-pdf-export.pdf";

    // Generate a unique filename by appending a counter
    let fileName = baseFileName;
    let counter = 0;
    while (fs.existsSync(path.join(downloadsPath, fileName))) {
      counter++;
      fileName = `${baseFileName.replace(".pdf", `(${counter}).pdf`)}`;
    }

    const filePath = path.join(downloadsPath, fileName);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);

    await pdfExport(filePath, html);

    res.sendFile(filePath, () => {
      console.log("PDF export successful.");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("PDF export failed.");
  }
});

app.post("/api/csv-export", async (req, res) => {
  try {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
      { name: "Bob", age: 35 },
    ];

    await csvExport(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("CSV export failed.");
  }
});

app.post("/api/excel-export", async (req, res) => {
  try {
    const data = [
      { name: "zayar tun", age: 100, email: "zayar@gmail.com" },
      { name: "zayar tun2", age: 100, email: "zayar2@gmail.com" },
    ];
    await excelExport(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("excel export failed.");
  }
});

module.exports = app;
