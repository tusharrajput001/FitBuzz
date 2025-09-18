import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { AuthContext } from "../AuthContext/AuthContext";

const Profile = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile</h2>
        
        <div className="profile-info">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
          
          <div className="profile-details">
            <h3>{user.name || user.fullName || "User"}</h3>
            <p className="email">{user.email || "No email provided"}</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Member Since</span>
                <span className="stat-value">2025</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Status</span>
                <span className="stat-value active">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-outline" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
          <button className="btn-fill logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
