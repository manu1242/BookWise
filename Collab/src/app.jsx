import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./Components/profile/profile";
import Booking from "./pages/Booking/Booking";
import Loader from "./Components/Loader/Loader";
import BookingConfirmation from "./pages/Booking/BookingConfrim";
import Admin from "./Components/Admin/Admin"
import Dealer from './Components/Dealer/Dealer'
import { ToastContainer } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(localStorage.getItem("role")); 

  const location = useLocation();

 
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dealers" element={<Dealer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingConfirm" element={<BookingConfirmation />} />
        <Route path="/contact" element={<Contact />} />

        {}
        <Route
          path="/admin-dashboard"
          element={
            role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          }
        />

        {}
        <Route
          path="/unauthorized"
          element={
            <h1 style={{ padding: "3rem", textAlign: "center" }}>
              Unauthorized Access
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App; 