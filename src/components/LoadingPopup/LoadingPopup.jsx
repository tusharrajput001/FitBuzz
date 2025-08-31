import React from "react";
import "./LoadingPopup.css";

const LoadingPopup = ({ isVisible, message = "Generating plan..." }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-popup">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
