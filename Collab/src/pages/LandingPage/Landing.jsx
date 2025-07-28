import React, { useState, useEffect } from "react";
import user from "../../assets/user.png";
import phone from "../../assets/phone.svg";
import avatar from "../../assets/Avatar.svg";
import {  useNavigate } from "react-router-dom";
import Contact from "../contact/Contact";
import Footer from '../../pages/Footer/Footer'
import "./Landingpage.css";


const Landingpage = () => {
  const navigate = useNavigate();
  const handleDealerClick = () => {
    navigate('/dealers');
  };


  return (
    <div className="landingpage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">BookWise</div>

        <button className="navbar-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Best Booking Management</span>
          <h1 x>
            Enhance your Booking control <br /> with{" "}
            <span className="highlight">BookWise</span>
          </h1>
          <br />
          <p className="tagline">
            Book with confidence — flexible slots, secure checkout, and instant
            updates.
          </p>
           <button  className="dealer-Btn"onClick={handleDealerClick}>Want to become a<span className=" dealer-btn"> Dealer</span></button>

          <div className="get-started-wrapper">
            <button
              className="get-started-mobile"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="phone-mockup">
            <span role="img" aria-label="user">
              <img
                src={phone}
                alt="User Icon"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "36px",
                  objectFit: "cover",
                }}
              />
            </span>
            

          
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <div className="trusted">
        <span>Trusted over 2k+ company</span>
        <div className="trusted-logos">
          <span>Alpha</span>
          <span>Momets</span>
          <span>Coreday</span>
          <span>Optum</span>
        
        </div>
      </div>

      {/* Workflow Section */}
      <section className="workflow">
        <span className="workflow-badge">Our workflow</span>
        <h2 className="platform">
          How our platform makes your workflow{" "}
          <span className="highlight2">easier</span>
        </h2>
        <div className="workflow-cards">
          {/* Card 1 */}
          <div className="workflow-card">
            <div className="card-icon">
              <span role="img" aria-label="user">
                <img
                  src={user}
                  alt="User Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </span>
            </div>
            <h3>Sign up and customize</h3>
            <p>
              Create your account in minutes and tailor the platform to meet
              your unique booking needs.
              <br />
              Whether you're managing appointments, events, or services —
              customize everything to fit your workflow.
            </p>

            <div className="workflow-card-inner">
              <div className="total-users-card">
                <div className="total-users-title">Total Users</div>
                <div className="avatars-row">
                  <img
                    className="avatar-img"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="avatar"
                  />
                  <img
                    className="avatar-img"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="avatar"
                  />
                  <img
                    className="avatar-img"
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="avatar"
                  />
                  <img
                    className="avatar-img"
                    src="https://randomuser.me/api/portraits/women/46.jpg"
                    alt="avatar"
                  />
                  <img
                    className="avatar-img"
                    src="https://randomuser.me/api/portraits/men/47.jpg"
                    alt="avatar"
                  />
                </div>
                <div className="users-count">
                  20K+ <span className="users-label">Users</span>
                </div>
                <div className="progress-row">
                  <div className="progress-label">Monthly Users</div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <span className="progress-value">1K+</span>
                </div>
                <div className="progress-row">
                  <div className="progress-label">Yearly Users</div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar purple"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <span className="progress-value">10K+</span>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="workflow-card">
            <div className="card-icons">
              <span role="img" aria-label="link">
                👤
              </span>
            </div>
            <h3>Link Your Accounts</h3>
            <p>
              Seamlessly connect your calendar, service listings, or team
              profiles to start managing bookings in one place.
              <br />
              Integrate third-party tools for a smoother scheduling experience.
            </p>

            <div className="workflow-card-inner">
              <div className="accounts-diagram">
                <div className="diagram-center">
                  <span role="img" aria-label="user">
                    <img
                      src={avatar}
                      alt="User Icon"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </span>
                </div>
                <div className="diagram-node node1"></div>
                <div className="diagram-node node2"></div>
                <div className="diagram-node node3"></div>
                <div className="diagram-node node4"></div>
              </div>
              <div className="accounts-count">
                <span className="accounts-number">20+</span>
                <span className="accounts-label">
                  Integrates with platform over
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <Contact/>
      <Footer />
    </div>
  );
};

export default Landingpage;
