const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  providerName: String,
  phone: Number,
  email: String,
  price: Number,
  location: String,
  category: String,
  images: [String],
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
