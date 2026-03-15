import React from 'react';
import './FishBackground.css';

const FishBackground = () => {
  return (
    <div className="fish-background-container">
      <div className="ocean-overlay" style={{position: 'absolute', inset: 0, background: 'rgba(2, 12, 27, 0.5)', zIndex: 0}}></div>

      <div className="bubbles">
        {/* 8 bolhas originais */}
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        {/* 18 bolhas bonitas subindo devagar */}
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="ocean">
        <div className="fish">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
};

export default FishBackground;