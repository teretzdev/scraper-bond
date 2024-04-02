
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mysql = require('mysql');

// Create a connection to your database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Read the PDF
const dataBuffer = fs.readFileSync('BOND.pdf');

pdfParse(dataBuffer).then(data => {
  // Split the text into lines
  const lines = data.text.split('\n');

  // Iterate over the lines
  for (const line of lines) {
    // Use regex to match the fields
    const bondNumberMatch = line.match(/Bond Number\s+(.*)/);
    const statusMatch = line.match(/Status\s+(.*)/);
    // ... repeat for other fields

    // If a bond number was found, insert it into the database
    if (bondNumberMatch) {
      const bondNumber = bondNumberMatch[1];
      const query = `INSERT INTO bonds (bondNumber) VALUES ('${bondNumber}')`;

      db.query(query, (err, result) => {
        if (err) throw err;
        console.log('Bond number inserted');
      });
    }

    // Repeat similar blocks for other fields
  }
}).catch(err => {
  console.error(err);
});
