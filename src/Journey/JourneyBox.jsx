import React, { useState } from "react";
import "./JourneyBox.css";
import Login from "../Login/Login"; 
import Signup from "../Signup/Signup";

const JourneyBox = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const backToJourney = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="journey-wrapper">
      {!showLogin && !showSignup ? (
        <div className="journey-container animate-slide-in">
          <h2>Welcome to FitBuzz</h2>
          <p>
            FitBuzz helps you stay motivated, track progress, and achieve your
            fitness goals with personalized workouts and health tips all in one app.
          </p>
          <button onClick={openLogin}>Start your journey</button>
        </div>
      ) : showLogin ? (
        <div className="animate-slide-in">
          <Login onBack={backToJourney} onSignup={openSignup} />
        </div>
      ) : (
        <div className="animate-slide-in">
          <Signup onBack={backToJourney} onLogin={openLogin} />
        </div>
      )}
    </div>
  );
};

export default JourneyBox;
