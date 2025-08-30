import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <div>
          <input placeholder="Enter Full Name" />
        </div>
        <div>
          <input placeholder="Enter Email" />
        </div>
        <div>
          <input placeholder="Enter Password" type="password" />
        </div>
        <button className="signup-btn">Sign Up</button>
        <p>Already have an account? <Link to="/signin">Login</Link></p>
        <p><Link to="/">← Back to Home</Link></p>
      </div>
    </div>
  );
};

export default Signup;
