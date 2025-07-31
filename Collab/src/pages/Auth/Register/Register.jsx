import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../FireBase/Firebase";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+[0-9][^\s@]*@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
    const usernameRegex = /^[A-Za-z0-9\s]+$/;

    if (!userName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!usernameRegex.test(userName)) {
      setError(
        "Username can only include letters, numbers, and spaces (no symbols)"
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email must include at least one number and be valid");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 6-16 characters and include a letter, number, and special character"
      );
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            email,
            password,
            role: isAdmin ? "admin" : "user",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (isAdmin) {
          setMessage("✅ Admin request sent. Please wait for email approval.");
        } else {
          toast.success("✅ Registration successful!");
          navigate("/login");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    if (googleLoading) return; // prevent double clicks
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/auth/google-register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            role: isAdmin ? "admin" : "user",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Google sign-in failed");
        return;
      }

      if (data && data.user) {
        toast.success("✅ Google login success");
        localStorage.setItem("token", "GOOGLE_USER");
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", user.email);

        if (data.user.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          navigate("/home");
        }
      } else {
        setMessage(data.message || "Request sent.");
      }
    } catch (err) {
      console.error("Google Register Error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left">
          <h1 className="signup-title">Register</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="userName">Username</label>
            <input
              className="signup-input"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
            />

            <label htmlFor="email">Email</label>
            <input
              className="signup-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <label htmlFor="password">Password</label>
            <input
              className="signup-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <div className="admin-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  disabled={loading}
                />
                Register as Admin
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" disabled={loading} /> Remember me
              </label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            <button className="sub-Btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          <p className="signin-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="login-right">
          <h4 className="oauth-title">Or</h4>

          <button
            className="oauth-btn google"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              "Loading..."
            ) : (
              <span className="oauth-content">
                <FcGoogle className="oauth-icon" />
                Continue with Google
              </span>
            )}
          </button>

          <button className="oauth-btn apple" disabled={true}>
            <span className="oauth-content">
              <FaApple className="oauth-icon" />
              Continue with Apple
            </span>
          </button>

          <p className="terms">
            By registering, you agree to our <br />
            <a href="#">Terms of service</a> and <a href="#">Privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
