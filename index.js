// In index.js
const { parsePDF } = require('./pdfParse.js');

import { sequelize, Bond } from './models/bond.js';

const pdfPath = 'BOND.pdf';  // Update this path

(async () => {
  try {
    const bondEntries = await parsePDF(pdfPath);
    console.log(`Parsed ${bondEntries.length} bond entries`);

    await sequelize.sync();  // Ensure the table is created

    for (const entry of bondEntries) {
      await Bond.create(entry);
    }

    console.log('All bond entries have been saved to the database.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await sequelize.close();
  }
})();
