const fs = require('fs');
const PDFParser = require('pdf2json');
const Bond = require('./models/bond.js'); // Corrected path to your Sequelize model

const parsePDF = (filePath) => {
  const pdfParser = new PDFParser();

  pdfParser.loadPDF(filePath);

  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', errData => reject(errData.parserError));
    pdfParser.on('pdfParser_dataReady', async (pdfData) => {
      const textPages = pdfData.formImage.Pages.map(page => 
        page.Texts.map(t => decodeURIComponent(t.R[0].T)).join(' ')
      ).join('\n');
      
      const bondEntries = textPages.split(/(?=Bond Number:)/g); // Updated to split the textPages into bond entries
      const parsedBonds = bondEntries.map(parseBondEntry); // Parse each bond entry

      // Save each bond to the database
      for (let bond of parsedBonds) {
        try {
          await Bond.create(bond);
        } catch (error) {
          console.error('Error saving bond to database:', error);
        }
      }

      resolve(parsedBonds.length); // Resolve the promise with the count of bonds processed
    });
  });
};

function parseBondEntry(entry) {
  const bond = {};

  // Regular expressions to extract bond information
  const bondNumberPattern = /Bond Number: (\S+)/;
  const statusPattern = /Status: (\S+)/;
  const amountPattern = /Amount: (\$\d+(\.\d+)?)/;
  // Add more patterns as needed for other fields

  bond.bondNumber = (entry.match(bondNumberPattern) || [])[1];
  bond.status = (entry.match(statusPattern) || [])[1];
  bond.amount = (entry.match(amountPattern) || [])[1];
  // Parse and assign other fields similarly

  return bond;
}

// Assuming you're calling this function with the path to your PDF
parsePDF('./BOND.pdf').then(count => {
  console.log(`${count} bonds processed and saved to the database.`);
}).catch(error => {
  console.error('An error occurred:', error);
});

// In pdfParse.js
// In pdfParse.js
module.exports = { parsePDF };
