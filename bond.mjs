import fs from 'fs/promises'; 
import { PDFDocument } from 'pdf-lib'; 

function parsePdfContent(pdfContent) {
  const lines = pdfContent.split('\n');
  const records = [];
  let currentRecord = {};

  for (const line of lines) {
    if (line.match(/^\d+\s+ISSD/)) { // New record 
      // Process previous record (if it exists)
      if (Object.keys(currentRecord).length > 0) { 
        records.push(currentRecord);
      }

      const fields = line.split(/\s+/); 
      currentRecord = {
        'Bond Number': fields[0],
        'Status': fields[1],
        'Amount': fields[2],
        'CID': fields[3],
        'Name': fields.slice(4).join(' ') 
      };

    } else if (line.startsWith('Book In Date')) {      
      const fields = line.split(/\s+/);
      currentRecord['Book In Date'] = fields[3];
      currentRecord['Type'] = fields[4];

    } else if (line.trim() === "HOMELESS") { 
      currentRecord['Street'] = "HOMELESS"; // Assuming simple address storage
      currentRecord['City'] = "";
      currentRecord['State'] = "";

    } else if (line.startsWith('Address')) { 
      // Extract address (might need special handling)
      const addressParts = line.split(/\s+/).slice(2); // Get parts after "Address: Street"
      currentRecord['Street'] = addressParts.join(' '); 

    } else if (line.split(/\s+/)[0] === 'City') { 
      // Handle city line (assuming format is "City State Zip")
      const parts = line.split(/\s+/); 
      currentRecord['City'] = parts[1];
      currentRecord['State'] = parts[2];

    } else if (line.startsWith('Offense')) {
      currentRecord['Offense'] = line.split(/\s+/).slice(1).join(' '); 

    } else if (line.startsWith('MDate')) {
      currentRecord['Mdate'] = line.split(/\s+/)[1];

    } else if (line.startsWith('Bondsmen')) {
      currentRecord['Bondsmen'] = line.split(/\s+/)[1]; 
    } 
  }

  // Process the last record 
  if (Object.keys(currentRecord).length > 0) { 
    records.push(currentRecord);
  }

  return records;
}
async function readPdf(filePath) {
  try {
    const pdfBuffer = await fs.readFile(filePath); 
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    for (const page of pages) {
      const pageContent = await page.getTextContent(); 
      console.log(pageContent.items.map(item => item.str).join(' ')); 
    }

  } catch (err) {
    console.error(`Error reading PDF: ${err}`);
    throw err; 
  }
}

// Function to write parsed records to a CSV file (assuming you have this)
async function writeToCsv(records, csvFilePath) {
  // ... Your CSV writing logic here
}

// Main function
async function main() {
  const pdfPath = "./bond.pdf";
  const csvFilePath = "./parsed_records.csv";

  try {
    const pdfContent = await readPdf(pdfPath);
    const parsedRecords = await parsePdfContent(pdfContent);
    await writeToCsv(parsedRecords, csvFilePath);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
  }
}

// Execute main function
main();
