import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./LoadingPopup.css";

const LoadingPopup = ({ isVisible, message = "Generating plan..." }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-popup">
        <div className="loading-lottie">
          <DotLottieReact
            src="https://lottie.host/f8acf606-a67e-4717-ad4a-1dbdf2106eab/8C0h8a6yZe.lottie"
            loop
            autoplay
            speed={1}
            style={{ width: "180px", height: "180px", margin: "0 auto 1rem" }}
          />
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
