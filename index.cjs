const pdfParse = require('./pdfParse.cjs');
const Bond = require('./bondModel.cjs');

let numPages; // define numPages outside doThing function

async function main() {
  try {
    const pdfPath = './BOND.pdf'; // Make sure this path is correct and accessible
    numPages = await pdfParse(pdfPath)); // assign numPages the number of pages in the PDF file
    await Bond.sync();
    for (let i = 0; i < numPages; i++) {
      const entry = await parsePDF(pdfPath, { page: i + 1 })); // pass the current page number to the parsePDF function
      await Bond.create(entry);
    }
    console.log(`${numPages} bond entries have been saved to the database.`);
  } catch (error) {
    console.error('Failed to process PDF or save bond entries:', error);
  }
}

main();
