// LoaderComponent.js
import React from 'react';
import './LoaderComponent.css'; // Import the CSS file

const LoaderComponent = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoaderComponent;
