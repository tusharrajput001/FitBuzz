import React from "react";
import "./Login.css";

const Login = ({ onBack }) => {
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
      <button className="back-btn" onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default Login;
