import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, form);
      if (res.status == 201) {
        toast.success("Account created successfully! Please sign in.");
        navigate("/signin");
      }
    } catch (error) {
      console.log("Signup failed:", error.response?.data || error.message);
      
      // Show error message based on the error response
      if (error.response?.status === 400) {
        if (error.response.data?.message?.includes("email")) {
          toast.error("Email already exists. Please use a different email.");
        } else {
          toast.error("Invalid data. Please check your information.");
        }
      } else if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });

    if (value.length < 6) {
      setError("Password must be at least 6 characters long");
    } else {
      setError("");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <div>
          <input
            placeholder="Enter Full Name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div>
          <input
            placeholder="Enter Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <input
            placeholder="Enter Password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </div>
        <button className="signup-btn" onClick={handleSubmit}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/signin">Login</Link>
        </p>
        <p>
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
