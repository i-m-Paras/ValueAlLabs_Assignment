import React from "react";
import "./../styles/LoadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <p className="loading-text">Analyzing...</p>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingAnimation;
