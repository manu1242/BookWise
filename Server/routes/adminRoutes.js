const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.get("/dashboard", adminController.getDashboardData);
router.post("/create", adminController.createBooking);

module.exports = router;
