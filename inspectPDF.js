const pdfjsLib = require('pdfjs-dist');

// Rest of your code follows...


// Rest of your code follows...

// Path to the PDF file
const pdfPath = process.argv[2] || './BOND.pdf';

// Loading a PDF document
const loadingTask = pdfjsLib.getDocument(pdfPath);
loadingTask.promise.then(async (pdfDocument) => {
  console.log(`PDF loaded: ${pdfPath}`);
  console.log(`Number of Pages: ${pdfDocument.numPages}`);

  // Inspect each page
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    console.log(`Page ${pageNum}:`);
    const textContent = await page.getTextContent();
    // Log the text content of each page
    console.log(textContent.items.map(item => item.str).join(' '));
  }
}, (reason) => {
  // PDF loading error
  console.error(reason);
});
