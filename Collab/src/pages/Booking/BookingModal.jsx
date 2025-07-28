import React, { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import "./BookingModal.css";

const BookingModal = ({ isOpen, onClose, provider, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!provider) {
      toast.error("Provider details missing.");
      setIsSubmitting(false);
      return;
    }

    // const bookingData = {
    //   providerName: provider.providerName || provider.name,
    //   category: provider.category,
    //   price: provider.price,
    //   unit: provider.unit,
    //   location: provider.location,
    //   date,
    //   time,
    //   name,
    //   mobile,
    //   customerEmail: email,
    //   loggedInEmail: localStorage.getItem("email"),
    //   providerId: provider._id,
    // };
    // const bookingData = {
    //   providerName: provider.providerName || provider.name,
    //   category: provider.category,
    //   price: provider.price,
    //   unit: provider.unit,
    //   location: provider.location,
    //   date,
    //   time,
    //   name,
    //   mobile,
    //   customerEmail: email,
    //   loggedInEmail: localStorage.getItem("email"),
    //   providerId: provider._id,
    //   images: provider.images || [], // ✅ Add this
    //   rating: provider.rating || 0, // ✅ Match schema
    //   phone: provider.phone || "", // ✅ Optional: match backend schema
    //   email: provider.email || "", // ✅ Optional: match backend schema
    // };
    const bookingData = {
      providerName: provider.providerName || provider.name,
      category: provider.category,
      price: provider.price,
      unit: provider.unit,
      location: provider.location,
      date,
      time,
      name,
      mobile,
      customerEmail: email,
      loggedInEmail: localStorage.getItem("email"),
      providerId: provider._id,
      images: Array.isArray(provider.images)
        ? provider.images
        : [provider.images],
      rating: provider.rating || 0,
      phone: provider.phone || "",
      email: provider.email || "",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/Email-Booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Booking confirmed and email sent!");
        setIsSubmitting(false);
        onSubmit(bookingData);
        onClose();
      } else {
        toast.error("Booking failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred");
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !provider) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Book Your Appointment</h2>

        <div className="provider-info">
          <h3>{provider.providerName || provider.name}</h3>
          <p>
            <strong>Category:</strong> {provider.category}
          </p>
          <p>
            <strong>Location:</strong> {provider.location}
          </p>
          <p>
            <strong>Price:</strong> ₹{provider.price}/{provider.unit}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            <Rating
              providerId={provider._id}
              initialRating={provider.rating || 5.0}
              readonly
            />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Mobile</label>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label>Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
