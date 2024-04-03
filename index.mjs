// In index.mjs
import { parsePDF } from './pdfParse.mjs';
import Bond from './bondModel.mjs';
import mongoose from 'mongoose';


async function main() {
    try {
        mongoose.connect('mongodb+srv://teretzdev:silver09!!@cluster011.inauixz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
   
        const pdfPath = 'D:\\BOND\\BOND.pdf'; // Ensure this path is correct
        const bondEntries = await parsePDF(pdfPath);

        for (const entry of bondEntries) {
            const bond = new Bond(entry);
            await bond.save(); // save each entry to the database
          }
      
          console.log(`${bondEntries.length} bond entries have been saved to the database.`);
        } catch (error) {
          console.error('Failed to process PDF or save bond entries:', error);
        } finally {
          await mongoose.disconnect(); // disconnect from the database once done
        }
      }
      
      main();
