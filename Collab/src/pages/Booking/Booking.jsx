import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import BookingConfirmation from "./BookingConfrim";
import bookingOptions from "../../Data/MockData";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import ProfileIcon from "../../Components/profile/ProfileIcon";
import "./booking.css";

const BookingApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const categories = [
    { id: "all", name: "All Services", icon: "🏢" },
    { id: "salon", name: "Salon", icon: "💇" },
    { id: "doctor", name: "Doctor", icon: "👨‍⚕️" },
    { id: "hotel", name: "Hotel", icon: "🏨" },
  ];

  useEffect(() => {
    setServiceProviders(bookingOptions);
    setFilteredProviders(bookingOptions);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProviders(serviceProviders);
    } else {
      setFilteredProviders(
        serviceProviders.filter((p) => p.category === selectedCategory)
      );
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
        toast("Booking confirmed");

        const fullDetails = {
          ...bookingData,
          reference: result.reference || "BOOKREF123",
          promoCode: "PROMO40OFF",
        };

        setBookingDetails(fullDetails); // ✅ fixed
        setShowConfirmation(true);
        setIsModalOpen(false);
        setSelectedProvider(null);

        // Send confirmation email
        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              name: fullDetails.name,
              email: fullDetails.email,
              mobile: fullDetails.mobile || "N/A",
              date: fullDetails.date,
              time: fullDetails.time,
              location: fullDetails.location,
              reference: fullDetails.reference,
              promoCode: fullDetails.promoCode,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          )
          .then((res) => {
            console.log("Email sent:", res.status);
          })
          .catch((err) => {
            console.error("Email failed:", err);
          });
      } else {
        toast("Something went wrong");
      }
    } catch (error) {
      toast(error.message || "Error occurred");
    }
  };

  return (
    <div className="booking-container">
      {localStorage.getItem("email") && (
        <ProfileIcon email={localStorage.getItem("email")} className="pf-con" />
      )}
      <h1 className="booking-title">Book Your Service</h1>
      <p className="booking-subtitle">Find and book top service providers</p>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span>{category.icon}</span> {category.name}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {filteredProviders.map((provider) => (
          <div className="card" key={provider.id}>
            <div className="card-image-wrapper">
              <img
                src={provider.image}
                alt={provider.name}
                className="card-image"
              />
              <h3 className="card-name-overlay">{provider.name}</h3>
            </div>
            <div className="card-content">
              <div className="card-header">
                <span className="badge">{provider.category}</span>
                <span className="rating">⭐ {provider.rating}</span>
              </div>
              <div className="content-text">
                <p className="location">📍 {provider.location}</p>
                <p className="availability">🕒 {provider.availability}</p>
                <p className="contact">📞 {provider.Contact}</p>
                <p className="desc">{provider.description}</p>
              </div>
              <div className="card-footer">
                <span className="price">
                  ₹{provider.price}/{provider.unit || "service"}
                </span>
                <button
                  className="book-now"
                  onClick={() => handleBookNow(provider)}
                >
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
