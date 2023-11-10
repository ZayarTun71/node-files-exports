const fs = require("fs");
const fastcsv = require("fast-csv");
const os = require('os');
const path = require('path');

exports.csvExport = async (data) => {
  

  const downloadFolderPath = path.join(os.homedir(), 'Downloads');
  const fileName = "test.csv";
  const filePath = path.join(downloadFolderPath, fileName);
  // Create a write stream to the CSV file
  const ws = fs.createWriteStream(filePath);

  // Create a CSV writer
  const csvStream = fastcsv
    .format({ headers: true }) // Set headers to true
    .transform((row) => ({
      // Transform the data as needed
      Name: row.name,
      Age: row.age,
    }));

  // Pipe the data to the CSV file
  csvStream.pipe(ws);

  // Write the data to the CSV file
  data.forEach((item) => csvStream.write(item));

  // End the writing process
  csvStream.end();

  ws.on("finish", () => {
    console.log("CSV file has been written successfully.");
  });

  ws.on("error", (error) => {
    console.error("Error writing CSV:", error);
  });
};
