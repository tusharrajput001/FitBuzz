import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import authService from "../services/auth/authService";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/logout`,
        {}, // empty body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );

      if (res.status === 200) {
        // Clear local storage and update state
        authService.logout();
        setIsAuthenticated(false);
        navigate("/");
      } else {
        console.error("Logout failed:", res);
      }
    } catch (error) {
      console.error("Logout error:", error);
      authService.logout();
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        {/* Logo / Brand */}
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo-main">Fit</span>
            <span className="logo-highlight">Buzz</span>
          </Link>
        </div>

        {/* Buttons */}
        <div className="nav-buttons">
          {!isAuthenticated ? (
            // Show Sign In and Sign Up buttons when user is not authenticated
            <>
              <button
                className="btn-outline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <button className="btn-fill" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          ) : (
            // Show Dashboard, Profile button and Logout when user is authenticated
            <>
              {/* <button
                className="btn-outline"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button> */}
              <button
                className="btn-outline profile-icon-btn"
                onClick={() => navigate("/profile")}
                aria-label="Profile"
              >
                <CgProfile />
              </button>
              {/* <button className="btn-fill" onClick={handleLogout}>
                Logout
              </button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
