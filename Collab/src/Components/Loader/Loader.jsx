import React from "react";

import "./Orb.css";

const Loader = () => {
  return (
    // <div className="loader-wrapper">
    //   {}
    //   <Particles
    //     particleColors={["#ffffff", "#ffffff"]}
    //     particleCount={200}
    //     particleSpread={10}
    //     speed={0.1}
    //     particleBaseSize={100}
    //     moveParticlesOnHover={true}
    //     alphaParticles={false}
    //     disableRotation={false}
    //     className="particle-bg"
    //   />

    //   {}
    //   <div className="loader-overlay">
    //     <span className="loader-ring"></span>
    //     <div className="loader-text">
    //       <span>L</span>
    //       <span>o</span>
    //       <span>a</span>
    //       <span>d</span>
    //       <span>i</span>
    //       <span>n</span>
    //       <span>g</span>
    //       <span>.</span>
    //     </div>
    //   </div>
    // </div>
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
