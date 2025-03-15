import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.png';
import DashboardButton from '../DashboardButton';
import Modal from '../Modal';
import RainEffect from '../RainEffect';
import rainIcon from '../assets/toggle_rain.png'
import playerImage from '../assets/player.png'

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showRain, setShowRain] = useState<boolean>(true);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const toggleRain = (): void => setShowRain(prev => !prev);

  return (
    <div className="relative w-screen h-screen">
      {showRain && <RainEffect />}
      <div
        className="absolute inset-0"
        style={{
          ...(showRain
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '80vw 88vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }
            : {
                backgroundColor: "#e4ffe1",
              }),
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '80vw 88vh',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />

      <div className="absolute inset-0 z-10">
        <div className="absolute top-4 left-4 flex flex-col space-y-20">
          <DashboardButton
            onClick={openModal}
            className="px-6 py-2 text-white bg-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-700"
            style={{ fontSize: "28px" }}
          >
            Tasks
          </DashboardButton>
          <DashboardButton
            className="px-6 py-2 text-white bg-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-700"
            style={{ fontSize: "28px" }}
          >
            Insights
          </DashboardButton>
        </div>
        <div className="absolute top-4 right-4">
          <img
            src={rainIcon}
            alt="Toggle Rain"
            onClick={toggleRain}
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default Dashboard;
