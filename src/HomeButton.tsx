import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from './assets/home.png';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/prompt');
  };

  return (
    <button
      onClick={handleHome}
      className="absolute top-4 left-7"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={homeIcon}
        alt="Home"
        className="w-25 h-25"
      />
    </button>
  );
};

export default HomeButton;
