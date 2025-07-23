const BookedConfirm = require("../models/BookedConfirm");
const Booking = require("../models/Booking");
const EmailBooking = require("../models/EmailBooking");;

require("dotenv").config();

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("Booking creation error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.BookedConfirmed = async (req, res) => {
  try {
    const booking = new BookedConfirm(req.body);
    await booking.save();
    res
      .status(201)
      .json({ success: true, message: "Booking confirmed", booking });
  } catch (error) {
    console.error("Booking Confirmatins error:", error.message);
    res.status(500).json({ sucess: false, error: err.message });
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


exports.createEmailBooking = async(req, res) => {
  try {
    const {
      providerId,
      providerName,
      category,
      price,
      unit,
      location,
      date,
      time,
      name,
      mobile,
      customerEmail,
      loggedInEmail,
    } = req.body;

    if (!providerId || !date || !time || !name || !mobile || !customerEmail) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const Emailbooking = new EmailBooking({
      providerId,
      providerName,
      category,
      price,
      unit,
      location,
      date,
      time,
      customerName: name,
      mobile,
      customerEmail,
      loggedInEmail,
    });

    await Emailbooking.save();
    return res.json({ success: true, EmailbookingId: Emailbooking._id });
  } catch (err) {
    console.error("EmailBooking error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
