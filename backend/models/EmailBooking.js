const mongoose = require('mongoose');

const EmailBooking = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Provider' },
  providerName: String,
  category: String,
  price: Number,
  unit: String,
  location: String,
  date: Date,
  time: String,
  customerName: String,
  mobile: String,
  customerEmail: String,
  loggedInEmail: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailBooking', EmailBooking);
