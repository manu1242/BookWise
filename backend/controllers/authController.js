const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendemail");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "pending-admin",
        isAdminApproved: false,
      });

      const encodedData = Buffer.from(JSON.stringify({ email })).toString(
        "base64"
      );

      const approvalLink = `${process.env.SERVER_URL}api/auth/approve-admin?data=${encodedData}`;

      await sendEmail(
        process.env.ADMIN_EMAIL,
        "Admin Access Request",
        `<p>User <strong>${name}</strong> (${email}) requested admin access.</p>
         <p><a href="${approvalLink}">Click here to approve</a></p>`
      );

      return res
        .status(200)
        .json({ message: "Admin access request sent. Await approval." });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isAdminApproved: true,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "pending-admin" && !user.isAdminApproved) {
      return res.status(403).json({ message: "Admin access pending approval" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const approveAdmin = async (req, res) => {
  try {
    const { data } = req.query;
    if (!data) return res.status(400).send("Invalid approval link");

    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    const { email } = decoded;

    const user = await User.findOne({ email });
    if (!user || user.role !== "pending-admin") {
      return res.status(404).send("No pending admin found");
    }

    user.role = "admin";
    user.isAdminApproved = true;
    const updatedUser = await user.save();

    console.log("✅ Admin Approved:", updatedUser);

    return res.send(
      `<h2>✅ Admin Approved!</h2><p>You can now log in as admin.</p>`
    );
  } catch (error) {
    console.error("Admin Approval Error:", error);
    res.status(500).send("Error approving admin.");
  }
};
const googleRegister = async (req, res) => {
  try {
    const { name, email, role = "user" } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.role === "pending-admin" && !user.isAdminApproved) {
        return res
          .status(403)
          .json({ message: "Admin access pending approval" });
      }

      return res.status(200).json({ message: "User already exists", user });
    }

    if (role === "admin") {
      user = await User.create({
        name,
        email,
        role: "pending-admin",
        isAdminApproved: false,
        authProvider: "google",
      });

      const encodedData = Buffer.from(JSON.stringify({ email })).toString(
        "base64"
      );
      const approvalLink = `${process.env.SERVER_URL}api/auth/approve-admin?data=${encodedData}`;

      await sendEmail(
        process.env.ADMIN_EMAIL,
        "Admin Access Request (via Google)",
        `
  <html>
    <head>
      <style>
        .email-container {
          font-family: 'Segoe UI', sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .header {
          text-align: center;
        }
        .header img {
          width: 100px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 20px;
          color: #333333;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #555555;
          margin-bottom: 30px;
        }
        .approve-btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4caf50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .approve-btn:hover {
          background-color: #45a049;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #999999;
          text-align: center;
        }

        /* Add animation */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .success-icon {
          width: 60px;
          animation: pulse 1.5s infinite;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://i.ibb.co/yYzLkV7/user-request.png" alt="Request Icon" />
        </div>

        <div class="title">🔔 Admin Access Request Received</div>

        <div class="message">
          <p><strong>${name}</strong> (${email}) has requested admin access via Google.</p>
          <p>Please review and approve the request if valid.</p>
        </div>

        <div style="text-align: center;">
          <a class="approve-btn" href="${approvalLink}">✅ Approve Admin Access</a>
        </div>

        <div class="footer">
          You are receiving this email because you're the system administrator.
        </div>
      </div>
    </body>
  </html>
  `
      );

      return res
        .status(200)
        .json({ message: "Admin access request sent. Await approval." });
    }

    // For normal user
    user = await User.create({
      name,
      email,
      role: "user",
      isAdminApproved: true,
      authProvider: "google",
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Google Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  approveAdmin,
  googleRegister,
};
