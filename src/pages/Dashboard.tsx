import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/game_states/background.png';
import one_cat from '../assets/game_states/one-cat.png';
import two_cat from '../assets/game_states/two-cat.png';
import three_cat from '../assets/game_states/three-cat.png';
import four_cat from '../assets/game_states/four-cat.png';
import InsightsModal from "../InsightsModal";
import Cloud from "../Cloud"; 

import DashboardButton from '../DashboardButton';
import Modal from '../Modal';
import RainEffect from '../RainEffect';
import rainIcon from '../assets/toggle_rain.png';
import Starfall from '../Starfall';

const Dashboard: React.FC = () => {
  const [isInsightsOpen, setIsInsightsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showRain, setShowRain] = useState<boolean>(true);

  const openInsights = (): void => setIsInsightsOpen(true);
  const closeInsights = (): void => setIsInsightsOpen(false);
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const toggleRain = (): void => setShowRain(prev => !prev);

  const numUsers = 4;
  const getBackgroundImage = () => {
    switch (numUsers) {
      case 1:
        return one_cat;
      case 2:
        return two_cat;
      case 3:
        return three_cat;
      case 4:
        return four_cat;
      default:
        return backgroundImage;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 z-20 pointer-events-none">
        {showRain ? <RainEffect /> : <Starfall />}
      </div>
      
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Cloud animationClass="animate-cloud1" top="10%" left="-200px" />
        <Cloud animationClass="animate-cloud2" top="20%" left="-300px" />
        <Cloud animationClass="animate-cloud3" top="40%" left="-250px" />
      </div>
      
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: '100vw 100vh',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'calc(50% + 8vw) center',
          zIndex: 1,
        }}
      />

      {/* UI Elements */}
      <div className="absolute inset-0 z-30">
        <div className="absolute top-4 left-4 flex flex-col space-y-20">
          <DashboardButton
            onClick={openModal}
            className="px-6 py-2 text-white bg-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-700"
            style={{ fontSize: "28px" }}
          >
            Tasks
          </DashboardButton>
          <DashboardButton
            onClick={openInsights}
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
        <InsightsModal isOpen={isInsightsOpen} onClose={closeInsights} />
      </div>
      <style>
        {`
          @keyframes cloudMove1 {
            0% { transform: translateX(-200px); opacity: 0.8; }
            100% { transform: translateX(120vw); opacity: 1; }
          }
          @keyframes cloudMove2 {
            0% { transform: translateX(-250px); opacity: 0.9; }
            100% { transform: translateX(120vw); opacity: 1; }
          }
          @keyframes cloudMove3 {
            0% { transform: translateX(-300px); opacity: 0.7; }
            100% { transform: translateX(120vw); opacity: 1; }
          }

          .animate-cloud1 {
            animation: cloudMove1 20s linear infinite;
          }
          .animate-cloud2 {
            animation: cloudMove2 30s linear infinite;
          }
          .animate-cloud3 {
            animation: cloudMove3 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
