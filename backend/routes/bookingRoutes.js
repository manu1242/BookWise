const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");
// const createEmailBooking = require("../controllers/EmailBookingController");

const {
  createBooking,
  createEmailBooking,
  BookedConfirmed,
  getBookingsByEmail,
  getAllBookings,
} = require("../controllers/bookingController");

router.get("/dashboard", adminController.getDashboardData);
router.post("/create", adminController.createBooking);
router.post("/Email-Booking", createEmailBooking);

router.post("/book", createBooking);
router.post("/book-confirm", BookedConfirmed);
router.get("/bookings", getBookingsByEmail);
router.get("/all-bookings", getAllBookings);

module.exports = router;
