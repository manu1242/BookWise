const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");
const {
  createBooking,
  getBookingsByEmail,
} = require("../controllers/bookingController");

router.get("/dashboard", adminController.getDashboardData);
router.post("/create", adminController.createBooking);

router.post("/book", createBooking);
router.get("/bookings", getBookingsByEmail);

module.exports = router;
