import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Users, DollarSign, Star, MapPin } from "lucide-react";
import StarRating from  "./pages/Booking/Rating/StarRating";
import "./Dashboard.css";

const Dashboard = ({ payments = [] }) => {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}api/bookings/dashboard`)
      .then((res) => {
        setListings(res.data.AllBookings || []);
        setUsers(res.data.AllUsers || []);
        setRevenue(res.data.totalRevenue || 0);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Package />
            </div>
            <div className="stat-content">
              <h3>{listings.length}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Users />
            </div>
            <div className="stat-content">
              <h3>{users.length}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign />
            </div>
            <div className="stat-content">
              <h3>₹{revenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-listings">
          <h2>Recent Listings</h2>
          <div className="listing-cards">
            {listings.slice(0, 3).map((booking) => (
              <div key={booking._id} className="listing-card">
                <img
                  src={
                    booking.images && booking.images.length > 0
                      ? booking.images[0]
                      : "/placeholder.jpg"
                  }
                  alt={booking.providerName}
                  className="booking-image"
                />

                <div className="listing-info">
                  <h3>{booking.providerName || "Unknown Name"}</h3>

                  <p className="location">
                    <MapPin size={16} />
                    <span>{booking.category}</span>{" "}
                    {/* using category as type of service */}
                  </p>

                  <p className="price">₹{booking.price || "N/A"}</p>

                  <p>
                    <b>Date:</b> {booking.date} <b>Time:</b> {booking.time}
                  </p>

                  <p>
                    <b>Email:</b> {booking.email}
                  </p>

                  <div className="rating">
                    <StarRating
                      providerId={booking._id}
                      initialRating={booking.rating || 5.0}
                      onRatingSubmitted={(id, newAvg) => {
                        // Optionally update listing state if you want live updates
                        setListings((prevListings) =>
                          prevListings.map((b) =>
                            b._id === id ? { ...b, rating: newAvg } : b
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-payments">
          <h2>Recent Payments</h2>
          <div className="payment-list">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="payment-item">
                <div className="payment-info">
                  <h4>{users.name}</h4>
                  <p>{payment.date}</p>
                </div>
                <div className="payment-amount">
                  <span className="amount">${payment.amount}</span>
                  <span className={`status ${payment.status}`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
