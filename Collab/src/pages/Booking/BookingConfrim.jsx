import React from "react";
import "./BookingConfirm.css";

const BookingConfirmation = ({ bookingDetails, onClose }) => {
  return (
    <div className="overlay-backdrop">
      <div className="overlay-content">
        <h2>Booking Confirmed</h2>
        <p className="user-greeting"><strong>{bookingDetails.name}</strong>, your booking has been confirmed!</p>

        <p className="email-display">Email: <strong>{bookingDetails.email}</strong></p>

        <div className="details-box">
          <p><strong>Provider Location:</strong> {bookingDetails.location}</p>
          <p><strong>Mobile:</strong> {bookingDetails.mobile}</p>
          <p><strong>Date:</strong> {bookingDetails.date}</p>
          <p><strong>Time:</strong> {bookingDetails.time}</p>
        </div>

        <div className="offer">
          <h4>🎉 CONGRATULATIONS</h4>
          <p><strong>Come Again!</strong></p>
        </div>

        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
