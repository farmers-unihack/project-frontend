import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButton from './assets/backarrow.png';

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  const handleBack = async (e: any) => {
    e.preventDefault()
    navigate('/prompt');
  };

  return (
    <button
      onClick={handleBack}
      className="relative inline-block hover:scale-110"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={backButton}
        alt="back"
        className="w-[50%] h-auto"
        />
    </button>
  );
};

export default BackButton;
