import React, { useState } from "react";
import "./JourneyBox.css";
import Login from "../Login/Login"; 

const JourneyBox = () => {
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
  };

  const backToJourney = () => {
    setShowLogin(false);
  };

  return (
    <div className="journey-wrapper">
      {!showLogin ? (
        <div className="journey-container animate-slide-in">
          <h2>Welcome to FitBuzz</h2>
          <p>
            FitBuzz helps you stay motivated, track progress, and achieve your
            fitness goals with personalized workouts and health tips all in one app.
          </p>
          <button onClick={openLogin}>Start your journey</button>
        </div>
      ) : (
        <div className="animate-slide-in">
          <Login onBack={backToJourney} />
        </div>
      )}
    </div>
  );
};

export default JourneyBox;
