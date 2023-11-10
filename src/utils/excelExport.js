const ExcelJS = require("exceljs");
const fs = require("fs");

exports.excelExport = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Email", key: "email" },
  ];
  worksheet.addRows(data);

  workbook.xlsx
    .writeFile("node_excel.xlsx")
    .then(function () {
      console.log("Excel file created successfully");
    })
    .catch(function (error) {
      console.error("Error creating Excel file:", error);
    });
};
