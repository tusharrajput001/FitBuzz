import React from "react";
import "./Login.css";

const Login = ({ onBack, onSignup }) => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input placeholder="Enter Email" />
      </div>
      <div>
        <input placeholder="Enter Password" type="password" />
      </div>
      <button className="login-btn">Login</button>
      <p>Don't have an account? <span onClick={onSignup}>Signup</span></p>
    </div>
  );
};

export default Login;
