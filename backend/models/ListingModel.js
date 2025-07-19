const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });



module.exports = mongoose.model('Listing', listingSchema);

