import React from "react";
import "./Signup.css";

const Signup = ({ onBack, onLogin }) => {
  return (
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
      <p>Already have an account? <span onClick={onLogin}>Login</span></p>
    </div>
  );
};

export default Signup;
