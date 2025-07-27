const Booking = require("../models/Booking");
const User = require("../models/User");
const upload = require("../middleware/multer");
const BookedConfirm = require("../models/BookedConfirm");

exports.getDashboardData = async (req, res) => {
  try {
    const AllBookings = await BookedConfirm.find().sort({ createdAt: -1 });
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
    const {
      providerName,
      phone,
      email,
      price,
      location,
      category,
      rating,
      description,
      
    } = req.body;

    const image = req.file ? req.file.path : null;

    
    if (
      !providerName ||
      !phone ||
      !email ||
      !price ||
      !location ||
      !category ||
      !rating ||
      !image
    ) {
      return res.status(400).json({ message: "Missing required fields" ,image});
    }

    const newBooking = new Booking({
      providerName,
      phone,
      email,
      price,
      location,
      category,
      rating,
      description,
      images: [image],
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const user = await User.findById(userId).select("-password"); 

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
