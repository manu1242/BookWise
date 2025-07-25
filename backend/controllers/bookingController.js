const BookedConfirm = require("../models/BookedConfirm");
const Booking = require("../models/Booking");
const EmailBooking = require("../models/EmailBooking");

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
    console.log("Received request body:", req.body);

    const {
      providerName,
      category,
      price,
      location,
      date,
      time,
      name,
      mobile,
      customerEmail,
      loggedInEmail,
      providerId,
      images, // ✅ add this
      rating, // ✅ optionally add this if you're passing it
    } = req.body;

    const booking = new BookedConfirm({
      providerName,
      category,
      price,
      location,
      date,
      time,
      name,
      phone: mobile,
      email: customerEmail,
      providerId,
      images,
      rating: rating || 0,
    });

    await booking.save();
    console.log("Booking saved successfully:", booking);

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Booking Confirmations error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Incoming email from query:", email); 
    const bookings = await EmailBooking.find({ loggedInEmail: email });
    console.log("Found bookings:", bookings);

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createEmailBooking = async (req, res) => {
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
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
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
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await BookedConfirm.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
