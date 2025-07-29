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

const allowedOrigins = [
  "https://book-wise-dev.vercel.app",   // frontend prod
  "http://localhost:5173"               // frontend local (optional for local testing)
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed from this origin"));
    }
  },
  
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from BookWise backend!");
});

app.use("/", categoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
