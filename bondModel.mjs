// bondModel.mjs
import mongoose from 'mongoose';

const bondSchema = new mongoose.Schema({
  bondNumber: String,
  status: String,
  amount: Number,
  court: String,  // This wasn't included in the fields you provided, but I added it just in case.
  cid: String,
  name: String,
  offense: String,
  mdate: Date,
  bondsmen: String,
  bookInDate: Date,
  type: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  // Other fields can be added here as necessary
});

const Bond = mongoose.model('Bond', bondSchema);

export { Bond };
