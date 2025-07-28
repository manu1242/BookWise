import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./Components/profile/profile";
import Booking from "./pages/Booking/Booking";
import Loader from "./Components/Loader/Loader";
import BookingConfirmation from "./pages/Booking/BookingConfrim";
import Admin from "./Components/Admin/Admin";
import Dealer from "./Components/Dealer/Dealer";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";

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
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={<ProtectedRoute element={Home} allowedRoles={["user"]} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} allowedRoles={["user"]} />}
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingConfirm"
          element={
            <ProtectedRoute
              element={BookingConfirmation}
              allowedRoles={["user"]}
            />
          }
        />
        <Route
          path="/dealers"
          element={<ProtectedRoute element={Dealer} allowedRoles={["user"]} />}
        />
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
