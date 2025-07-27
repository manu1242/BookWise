// controllers/ratingController.js

const RatingModel = require("../models/Rating");
const BookingModel = require("../models/Booking"); 

exports.rateProvider = async (req, res) => {
  const { providerId, userId, rating } = req.body;

  if (!providerId || !userId || !rating) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
  
    await RatingModel.findOneAndUpdate(
      { providerId, userId },
      { rating },
      { upsert: true }
    );

  
    const result = await RatingModel.aggregate([
      { $match: { providerId } },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    const updatedAverage = result[0]?.avg || 5.0;

    
    await BookingModel.findByIdAndUpdate(providerId, {
      rating: updatedAverage,
    });

  
    res.json({ success: true, updatedAverage });
  } catch (error) {
    console.error("Rating error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
