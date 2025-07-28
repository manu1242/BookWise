const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "https://book-wise-dev.vercel.app",
    // credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello  from BookWise backend!");
});
app.use("/", categoryRoutes);
app.use("/api/categories", categoryRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
module.exports = app;
