import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);

    if (!storedEmail) {
      navigate("/");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings?email=${storedEmail}`,
          
        );
        const data = await res.json();

        console.log("Booking data from backend:", data);
        if (data.success) setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <button onClick={() => navigate("/booking")} className="back-button">
          ← Back to Home
        </button>
        <h1 className="profile-title">My Profile</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* Profile Info */}
      <div className="profile-box">
        <div className="avatar">{email?.charAt(0).toUpperCase()}</div>
        <h2 className="name">Welcome!</h2>
        <p className="email">{email}</p>
      </div>

      {/* Bookings */}
      <div className="bookings-section">
        <div className="bookings-header">
          <div className="briefcase-icon">🧳</div>
          <h3>Your Bookings</h3>
          <span className="booking-count">{bookings.length} Active</span>
        </div>

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">📦</div>
            <p>No bookings yet</p>
            <small>Your future bookings will appear here</small>
          </div>
        ) : (
          <div className="booking-grid">
            {bookings.map((b, index) => (
              <div
                key={index}
                className="booking-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-top">
                  <div className="card-header">
                    <div className="icon-box">👤</div>
                    <div className="provider-name">{b.providerName}</div>
                  </div>

                  <span className="status">Confirmed</span>
                </div>

                <div className="user-details">
                  <div className="detail-item">
                    <span className="label">Category:</span>
                    <span className="value">{b.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{b.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">For:</span>
                    <span className="value">{b.customerEmail}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Date:</span>
                    <span className="value">{b.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time:</span>
                    <span className="value">{b.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Price:</span>
                    <span className="value">₹{b.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
