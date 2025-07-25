import React, { useEffect, useState } from "react";
import { User, Edit } from "lucide-react";
import "./Profile.css";

const AdminProfile = () => {
  const[admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role !== "admin" || !token) {
      window.location.href = "/login";
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setAdmin(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching admin profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!admin) return <p>Loading admin profile...</p>;

  return (
    <div className="profile">
      <h1>Admin Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h2>{admin.name}</h2>
            <p>{admin.role}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <label>Email</label>
            <span>{admin.email}</span>
          </div>
          <div className="detail-item">
            <label>Phone</label>
            <span>{admin.phone || "Not Provided"}</span>
          </div>
          <div className="detail-item">
            <label>Role</label>
            <span>{admin.role}</span>
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

export default AdminProfile;
