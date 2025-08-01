const mongoose = require("mongoose");

const bookedConfirm = new mongoose.Schema({
  providerName: String,
  phone: Number,
  name: String,
  email: String,
  price: Number,
  date: String,
  time: String,
  location: String,
  category: String,
  images: [String],
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.bookedConfirm ||
  mongoose.model("BookedConfirm", bookedConfirm);
