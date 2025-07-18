import React, { useState, useEffect } from "react";
import { Calendar, Clock, Check, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../Components/profile/ProfileIcon";

import "./Home.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      icon: Calendar,
      title: "Select Date & Time",
      description:
        "Choose your preferred date and time slot from our available options",
    },
    {
      icon: Clock,
      title: "Choose Slot",
      description: "Pick the perfect time slot that fits your schedule",
    },
    {
      icon: Check,
      title: "Confirm Booking",
      description: "Review your details and confirm your appointment",
    },
    {
      icon: Bell,
      title: "Receive Confirmation",
      description:
        "Get instant confirmation and reminders for your appointment",
    },
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const toggleDropdown = () => {
    navigate("/profile");
  };
  const handleStartBooking =()=>{
    navigate('/booking');
  }

  return (
    <div className="full-screen-gradient">
      
      {email && <ProfileIcon email={email}/>}

      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Book Appointments
            <br />
            <span className="hero-subtitle">Seamlessly</span>
          </h1>
          <p className="hero-description">
            Doctor, Hotel, or Salon — Manage your time with ease
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleStartBooking}>
              Start Booking
            </button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-section-wrapper">
        <div className="how-section">
          <div className="how-header">
            <h2 className="how-title">How It Works</h2>
            <p className="how-subtitle">
              Simple steps to book your perfect appointment in minutes
            </p>
          </div>

          <div className="how-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="how-card">
                  <div className="how-step-number">{index + 1}</div>
                  <div className="how-icon-container">
                    <Icon className="how-icon" />
                  </div>
                  <h3 className="how-card-title">{step.title}</h3>
                  <p className="how-card-description">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="connector-wrapper">
            <div className="connector-lines">
              <div className="connector-line"></div>
              <div className="connector-line"></div>
              <div className="connector-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-wrapper">
        <div className="cta-container">
          <h3 className="cta-heading">Ready to Get Started?</h3>
          <p className="cta-subtext">
            Join thousands of satisfied customers who trust us with their
            appointments
          </p>
          <button className="cta-button" onClick={handleStartBooking}>Book Your First Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
