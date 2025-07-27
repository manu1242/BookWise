import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ providerId, initialRating, onRatingSubmitted }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRated, setUserRated] = useState(false);
  const [avgRating, setAvgRating] = useState(parseFloat(initialRating) || 5.0);

  const handleRating = async (ratingValue) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId,
          userId: localStorage.getItem("userId") || "guest",
          rating: ratingValue,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const newAvg = parseFloat(data.updatedAverage);
        setAvgRating(newAvg);
        setUserRated(true);
        if (onRatingSubmitted) onRatingSubmitted(providerId, newAvg);
      }
    } catch (err) {
      console.error("Rating error:", err);
    }
  };

  return (
    <div className="stars-rating">
      {[...Array(5)].map((_, index) => {
        const star = index + 1;
        const isFilled = hoverRating
          ? star <= hoverRating
          : star <= Math.round(avgRating);

        return (
          <span
            key={index}
            className="star"
            style={{
              color: isFilled ? "#FFD700" : "#ccc",
              cursor: userRated ? "default" : "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={() => !userRated && setHoverRating(star)}
            onMouseLeave={() => !userRated && setHoverRating(0)}
            onClick={() => !userRated && handleRating(star)}
          >
            ★
          </span>
        );
      })}
      <span className="rating-value"> {avgRating.toFixed(1)}</span>
      {!userRated && <small style={{ fontSize: "15px" }}>Rate now</small>}
    </div>
  );
};

export default StarRating;
