import React, { useState } from 'react';
import { User, Edit } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [adminProfile] = useState({
    name: 'John Admin',
    email: 'admin@bookingplatform.com',
    phone: '+1 234 567 8900',
    role: 'Super Admin'
  });

  return (
    <div className="profile">
      <h1>Admin Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h2>{adminProfile.name}</h2>
            <p>{adminProfile.role}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <label>Email</label>
            <span>{adminProfile.email}</span>
          </div>
          <div className="detail-item">
            <label>Phone</label>
            <span>{adminProfile.phone}</span>
          </div>
          <div className="detail-item">
            <label>Role</label>
            <span>{adminProfile.role}</span>
          </div>
        </div>
        <button className="edit-profile-btn">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;