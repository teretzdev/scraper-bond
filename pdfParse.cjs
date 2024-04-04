// In pdfParse.cjs
const PDFParser = require('pdf2json');
 async function doThing(){
    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Assuming each bond record is structured over two lines
        const lines = textContent.items.map(item => item.str.trim());
        for (let j = 0; j < lines.length; j += 2) {
            console/log('lklk')
            const bondInfoLine = lines[j];
            const addressInfoLine = lines[j + 1];

            // Parse the individual lines
            const bondInfo = parseBondInfo(bondInfoLine);
            const addressInfo = parseAddressInfo(addressInfoLine);

            // Combine the parsed info into a single object
            const bondEntry = { ...bondInfo, ...addressInfo };

            // Log the bond entry for debugging
            console.log(`Parsed bond entry:`, bondEntry);

            bondEntries.push(bondEntry); 
 }}
 } 
async function parsePDF (filePath) {
    const pdfParser = new PDFParser();
    console.log('filepath is:', filePath)
    pdfParser.loadPDF(filePath);

    return new Promise((resolve, reject) => {
        const bondEntries = [];

doThing()

    // After all pages are processed, return the array of bond entries
    return bondEntries;
}
);

}




module.exports = { parsePDF };
