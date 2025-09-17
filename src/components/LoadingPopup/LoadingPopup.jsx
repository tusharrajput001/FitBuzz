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
            src="https://lottie.host/89615416-e785-464f-954b-8280dfdd59bf/kV6x9fxhsh.lottie"
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
