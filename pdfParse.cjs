// In pdfParse.cjs
const PDFParser = require('pdf2json');

let filePath = 'BOND.pdf'
const parsePDF = async (filePath) => {
 
  
  const pdfParser = new PDFParser();
  pdfParser.loadPDF(filePath);

  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', errData => reject(errData.parserError)));
    pdfParser.on('pdfParser_dataReady', pdfData => {
        if (!pdfData || !pdfData.formImage || !pdfData.formImage.Pages) {
            reject(new Error('Invalid PDF structure.'));
        }

        const textPages = pdfData.formImage.Pages.map(page => 
            page.Texts.map(t => decodeURIComponent(t.R[0].T)).join(' ')
        ).join('\n');
        resolve(textPages);
    });
  });
};

module.exports = { parsePDF };