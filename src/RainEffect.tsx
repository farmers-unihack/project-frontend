import React, { useEffect, useRef } from "react";
import "./Rain.css";

const RainEffect: React.FC = () => {
  const frontRowRef = useRef<HTMLDivElement>(null);

  const makeItRain = (): void => {
    if (frontRowRef.current) {
      frontRowRef.current.innerHTML = "";
      let increment = 0;
      let drops = "";
      while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * 98) + 1; // 1-98
        const randoFiver = Math.floor(Math.random() * 4) + 2;    // 2-5
        increment += randoFiver;
        drops += `<div class="drop" style="left: ${increment}%; bottom: ${
          randoFiver + randoFiver - 1 + 100
        }%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
                    <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
                    <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
                  </div>`;
      }
      frontRowRef.current.innerHTML = drops;
    }
  };

  useEffect(() => {
    makeItRain();
  }, []);

  return (
    <div className="rain-effect-container">
      <div className="rain front-row" ref={frontRowRef}></div>
    </div>
  );
};

export default RainEffect;
