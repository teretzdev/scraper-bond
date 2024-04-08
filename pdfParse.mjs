import fs from 'fs/promises';


async function parsePDF(pdfPath) {
    
  try {
    const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
    const buffer = await fs.readFile(pdfPath);
    const uint8Array = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    const bondEntries = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      bondEntries.push({
        pageNumber: i,
        textContent: textContent.items.map(item => item.str).join(' '),
      });
      
    }

    console.log(`${bondEntries.length} bond entries have been processed.`);
    return bondEntries;
  } catch (error) {
    console.error('Failed to process PDF:', error);
  }
}

export { parsePDF };
