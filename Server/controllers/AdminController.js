const Booking = require("../models/Booking");
const User = require("../models/User");

exports.getDashboardData = async (req, res) => {
  try {
    const AllBookings = await Booking.find().sort({ createdAt: -1 });
    const AllUsers = await User.find();
    const totalRevenue = AllBookings.reduce((sum, booking) => sum + (booking.price || 0), 0);

    res.status(200).json({
      success: true,
      AllBookings,
      AllUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
