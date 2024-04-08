const fs = require('fs');
const pdfParser = require('pdf-parse');

async function parsePDF(filePath, options) {
  try {
    const data = await fs.promises.readFile(filePath)); // read the PDF file data
    const parsedData = await pdfParser(data, options)); // parse the PDF file data using pdf-parse library
    return parsedData; // return the parsed data
  } catch (error) {
    throw new Error('Failed to parse PDF:', error); // throw an error if there is any issue while parsing the PDF file data
  }
}

module.exports = parsePDF; // export the parsePDF function for use in other files
