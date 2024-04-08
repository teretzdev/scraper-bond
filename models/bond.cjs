// In models/bond.cjs
const { parsePDF } = require('./pdfParse.cjs');
const Bond = require('./bondModel.cjs');

async function main() {
  try {
    const pdfPath = './BOND.pdf'; // Make sure this path is correct and accessible
    const bondEntries = await parsePDF(pdfPath);
    await Bond.sync();
    for (const entry of bondEntries) {
      await Bond.create(entry);
    }
    console.log(`${bondEntries.length} bond entries have been saved to the database.`);
  } catch (error) {
    console.error('Failed to process PDF or save bond entries:', error);
  }
}

main();
