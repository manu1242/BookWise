const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminController = require("../controllers/AdminController");
const bookingController = require("../controllers/bookingController");
const upload = require("../middleware/multer");

// ✅ Image Upload Route
router.post("/upload", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown upload error", error: err.message });
    }

    // Pass control to controller if file is uploaded
    return adminController.uploadFile(req, res);
  });
});

// Other Routes
router.get("/dashboard", adminController.getDashboardData);
router.post("/create", adminController.createBooking);
router.post("/book", bookingController.createBooking);
router.get("/bookings", bookingController.getBookingsByEmail);

module.exports = router;
