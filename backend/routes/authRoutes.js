
const express = require("express");
const router = express.Router();
const { register, login, approveAdmin,googleRegister } = require("../controllers/authController");


router.post("/google-register", googleRegister); 
router.post("/register", register);
router.post("/login", login);
router.get("/approve-admin", approveAdmin);




module.exports = router;

