// src/components/ProfileIcon.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileIcon.css";

const ProfileIcon = ({ email }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/profile");

  if (!email) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-icon" onClick={handleClick}>
        {email.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

export default ProfileIcon;
