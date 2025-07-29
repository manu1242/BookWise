const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
     
      return this.authProvider !== "google";
    },
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  role: {
    type: String,
    enum: ["user", "admin", "pending-admin"],
    default: "user",
  },
  isAdminApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
