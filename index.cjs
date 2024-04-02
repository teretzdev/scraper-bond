// In index.cjs
const { parsePDF } = require('./pdfParse.cjs');

async function main() {
    const pdfPath = './BOND.pdf'; // Make sure this path is correct and accessible
    try {
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
