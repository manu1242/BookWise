const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminController = require("../controllers/AdminController");
const bookingController = require("../controllers/bookingController");
const upload = require("../middleware/multer");

router.get("/dashboard", adminController.getDashboardData);
router.post(
  "/create",
 upload.single("image"),
  adminController.createBooking
);
router.post("/book", bookingController.createBooking);
router.get("/bookings", bookingController.getBookingsByEmail);
const authenticate = require("../middleware/authMiddleware");

router.get("/me", authenticate, adminController.getAdminProfile);


module.exports = router;
