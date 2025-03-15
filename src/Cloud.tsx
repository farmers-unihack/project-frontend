import React from 'react';
import cloudImage from './assets/cloud_2.png';

interface CloudProps {
  animationClass: string;
  top: string;
  left: string;
}

const Cloud: React.FC<CloudProps> = ({ animationClass, top, left }) => {
  return (
    <div className={`absolute ${animationClass}`} style={{ top, left }}>
      <img
        src={cloudImage}
        alt="Glowing Cloud"
        className="w-48 h-32 filter drop-shadow-xl opacity-80"
      />
    </div>
  );
};

export default Cloud;
