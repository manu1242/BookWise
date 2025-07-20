import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import BookingConfirmation from "./BookingConfrim";
import { toast } from "react-toastify";
import { sendBookingConfirmationEmail } from "../../utils/email";
import ProfileIcon from "../../Components/profile/ProfileIcon";
import "./booking.css";

const BookingApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          setCategories([{ _id: "all", name: "All Services" }, ...data.categories]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/all-bookings`);
        const text = await res.text();
        const data = JSON.parse(text);
        if (data.success) {
          setServiceProviders(data.bookings);
          setFilteredProviders(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchCategories();
    fetchBookings();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProviders(serviceProviders);
    } else {
      const filtered = serviceProviders.filter(
        (provider) =>
          provider.category &&
          provider.category.toLowerCase() === selectedCategory
      );
      setFilteredProviders(filtered);
    }
  }, [selectedCategory, serviceProviders]);

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Booking confirmed");

        const fullDetails = {
          ...bookingData,
          reference: result.reference || "BOOKREF123",
          promoCode: "PROMO40OFF",
        };

        setBookingDetails(fullDetails);
        setShowConfirmation(true);
        setIsModalOpen(false);
        setSelectedProvider(null);

        await sendBookingConfirmationEmail(fullDetails);
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error.message);
      toast.error("Error occurred");
    }
  };

  return (
    <div className="booking-container">
      {localStorage.getItem("email") && (
        <ProfileIcon email={localStorage.getItem("email")} className="pf-con" />
      )}
      <h1 className="booking-title">Book Your Service</h1>
      <p className="booking-subtitle">Find and book top service providers</p>

      <div className="filter-dropdown">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Services</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        {filteredProviders.map((provider) => (
          <div className="card" key={provider._id}>
            <div className="card-image-wrapper">
              <img
                src={
                  provider.images && provider.images.length > 0
                    ? provider.images[0]
                    : "/placeholder.jpg"
                }
                alt={provider.providerName}
                className="card-image"
              />
              <h3 className="card-name-overlay">{provider.providerName}</h3>
            </div>
            <div className="card-content">
              <div className="card-header">
                <span className="badge">{provider.category}</span>
                <span className="rating">⭐ {provider.rating}</span>
              </div>
              <div className="content-text">
                <p className="location">📍 {provider.location}</p>
                <p className="desc">{provider.description}</p>
                <p className="contact">📞 {provider.phone}</p>
              </div>
              <div className="card-footer">
                <span className="price">₹{provider.price}/service</span>
                <button className="book-now" onClick={() => handleBookNow(provider)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <p className="no-results">No providers found.</p>
      )}

      {isModalOpen && selectedProvider && (
        <BookingModal
          isOpen={isModalOpen}
          provider={selectedProvider}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProvider(null);
          }}
          onSubmit={handleBookingSubmit}
        />
      )}

      {showConfirmation && bookingDetails && (
        <BookingConfirmation
          bookingDetails={bookingDetails}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default BookingApp;
