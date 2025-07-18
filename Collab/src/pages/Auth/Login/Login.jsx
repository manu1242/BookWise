import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/LOGO.png";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Needed if backend sets cookies or sessions
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); // Save role
        localStorage.setItem("email", credentials.email);

        if (data.user.role === "admin") {
          console.log(data.user.role);
          window.location.href = "/admin-dashboard";
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-root">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <img src={logo} alt="CollabSphere" className="login-logo" />

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <div className="login-forgot">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <div className="login-signup">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </div>
          <div className="login-policy">
            By logging in, you agree to our <a href="#">Terms of service</a> and{" "}
            <a href="#">Privacy policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;