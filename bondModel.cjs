// In bondModel.cjs
const mongoose = require('mongoose');

const BondSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

module.exports = mongoose.model('Bond', BondSchema);
