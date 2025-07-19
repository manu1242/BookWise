const Booking = require("../models/Booking");
const User = require("../models/User");
const upload = require("../middleware/multer");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path,      // Cloudinary URL
      publicId: req.file.filename,  // Cloudinary public_id
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const AllBookings = await Booking.find().sort({ createdAt: -1 });
    const AllUsers = await User.find();
    const totalRevenue = AllBookings.reduce(
      (sum, booking) => sum + (booking.price || 0),
      0
    );

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
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
