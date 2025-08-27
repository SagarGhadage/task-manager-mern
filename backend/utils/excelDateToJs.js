  function excelDateToJSDate(excelDate) {
  // Excel's epoch starts on January 1, 1900
  const excelEpoch = new Date(1900, 0, 1);
  // Subtract 1 because Excel's date system includes a non-existent leap year day (February 29, 1900)
  const jsDate = new Date(excelEpoch.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000);
  return jsDate;
}
module.exports = {
  excelDateToJSDate,
};