// In test.js
const assert = require('assert');
const { parsePDF } = require('./pdfParse.cjs');
const Bond = require('./bondModel.cjs');

describe('parsePDF', () => {
  it('should return an array of bond entries', async () => {
    const pdfPath = './BOND.pdf'; // Make sure this path is correct and accessible
    const bondEntries = await parsePDF(pdfPath);
    assert.ok(Array.isArray(bondEntries));
  });
});
