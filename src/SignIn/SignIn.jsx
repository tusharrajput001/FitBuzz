import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div>
        <input placeholder="Enter Email" />
      </div>
      <div>
        <input placeholder="Enter Password" type="password" />
      </div>
      <button className="signin-btn">Sign In</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <p><Link to="/">← Back to Home</Link></p>
    </div>
  );
};

export default SignIn;
