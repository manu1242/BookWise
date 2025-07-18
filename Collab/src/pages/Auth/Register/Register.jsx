import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Track admin checkbox
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during registration.");
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
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              className="signup-input"
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              className="signup-input"
              type="password"
              id="password"
              name="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ✅ Admin checkbox */}
            <div className="admin-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                Register as Admin
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="sub-Btn" type="submit">
              Sign Up
            </button>
          </form>

          <p className="signin-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="login-right">
          <h4 className="oauth-title">Or</h4>

          <button className="oauth-btn google">
            <span className="oauth-content">
              <FcGoogle className="oauth-icon" />
              Continue with Google
            </span>
          </button>

          <button className="oauth-btn apple">
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
