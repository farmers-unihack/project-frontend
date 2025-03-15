import React from 'react';
import './Starfall.css';

const Starfall: React.FC = () => {
  return (
    <div className="starfall">
      {Array.from({ length: 40 }).map((_, index) => (
        <div key={index} className={`falling-star star-${index + 1}`}></div>
      ))}
    </div>
  );
};

export default Starfall;
