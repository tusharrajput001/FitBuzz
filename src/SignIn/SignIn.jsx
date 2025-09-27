import React, { useState , useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";
import axios from "axios"
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log('SignIn API_URL:', API_URL);

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);

      if (res.data?.session?.access_token) {
        // Save login info
        localStorage.setItem("token", res.data.session.access_token);
        localStorage.setItem("refreshToken", res.data.session.refresh_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsAuthenticated(true);
        toast.success("Login successful! Welcome back!");
        navigate("/")
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      
      // Show error message based on the error response
      if (error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your email.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Sign In</h2>
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
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="signin-btn" onClick={handleSubmit}>
          Sign In
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p>
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
