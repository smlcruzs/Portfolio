import React from 'react';
import './FishBackground.css';

const FishBackground = () => {
  return (
    <div className="fish-background-container">
      <div className="ocean-overlay" style={{position: 'absolute', inset: 0, background: 'rgba(2, 12, 27, 0.5)', zIndex: 0}}></div>

      {/* BOLHAS GLOBAIS */}
      <div className="bubbles">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="ocean">
        {/* PEIXE PEQUENO (SUPERFÍCIE) */}
        <div className="fish">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
};

export default FishBackground;