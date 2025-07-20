const Booking = require("../models/Booking");


exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('Booking creation error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query; 
    const bookings = await Booking.find({ loggedInEmail: email });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// controllers/bookingController.js

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

