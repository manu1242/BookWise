import React, { useState } from "react"; // ✅ Import useState
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Calendar,
  ArrowRight,
  Heart,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ✅ Declare state hooks
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/" },
    { name: "Bookings", href: "/booking" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/manohar-yalla/",
    },
  ];

  // ✅ Newsletter submit function
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      alert("Please enter a valid email.");
      return;
    }

    emailjs
      .send(
        "service_5kh4s9h",
        "template_kclp4g4",
        { subscriber_email: newsletterEmail },
        "E-eZxBmVLMFLjwdvA"
      )
      .then(() => {
        setSubscribed(true);
        setNewsletterEmail("");

        setTimeout(() => {
          setSubscribed(false);
        }, 4000); // show success message for 4 seconds
      })
      .catch(() => {
        alert("Subscription failed. Try again.");
      });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="brand-icon">
                <Calendar size={32} />
              </div>
              <h2 className="brand-name">BookWise</h2>
            </div>
            <p className="brand-description">
              Transform the way you book services with our intelligent platform.
              Connect with verified professionals, schedule seamlessly, and
              experience service excellence like never before.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="link-list">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    <ArrowRight size={14} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="section-title">Get in Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-details">
                  <span>Hyderabad</span>
                  <span>HITech City, st ,888801</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                <a href="tel:+1234567890" className="contact-link">
                  +91 888-555-333-22
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <a href="mailto:hello@bookwise.com" className="contact-link">
                  hello@bookwise.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated</h3>
              <p>
                Get the latest updates and exclusive offers delivered to your
                inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="subscribed-animation">
                🎉 You're Subscribed! 🎉
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="newsletter-form"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>© {currentYear} BookWise. Made with </span>
              <Heart size={14} className="heart-icon" />
              <span> for better service experiences.</span>
            </div>
            <div className="legal-links">
              <a href="#" className="legal-link">
                Privacy Policy
              </a>
              <a href="#" className="legal-link">
                Terms of Service
              </a>
              <a href="#" className="legal-link">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
