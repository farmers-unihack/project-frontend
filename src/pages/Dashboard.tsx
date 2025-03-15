import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/game_states/background.png';
import one_cat from '../assets/game_states/one-cat.png';
import two_cat from '../assets/game_states/two-cat.png';
import three_cat from '../assets/game_states/three-cat.png';
import four_cat from '../assets/game_states/four-cat.png';
import sprite00 from '../assets/spawn_transitions/sprite_00.png';
import sprite01 from '../assets/spawn_transitions/sprite_01.png';
import sprite02 from '../assets/spawn_transitions/sprite_02.png';
import sprite03 from '../assets/spawn_transitions/sprite_03.png';
import sprite04 from '../assets/spawn_transitions/sprite_04.png';
import sprite05 from '../assets/spawn_transitions/sprite_05.png';
import sprite06 from '../assets/spawn_transitions/sprite_06.png';
import sprite07 from '../assets/spawn_transitions/sprite_07.png';
import sprite08 from '../assets/spawn_transitions/sprite_08.png';
import sprite09 from '../assets/spawn_transitions/sprite_09.png';
import sprite10 from '../assets/spawn_transitions/sprite_10.png';
import sprite11 from '../assets/spawn_transitions/sprite_11.png';
import InsightsModal from "../InsightsModal";

import DashboardButton from '../DashboardButton';
import Modal from '../Modal';
import RainEffect from '../RainEffect';
import rainIcon from '../assets/toggle_rain.png'
import playerImage from '../assets/player.png'
import Starfall from '../Starfall';

const transitionFrames = [
  sprite00, sprite01, sprite02, sprite03, sprite04, sprite05,
  sprite06, sprite07, sprite08, sprite09, sprite10, sprite11
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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

/* todo: add api call to check for the number of users present, poll every 10 seconds, when switch is detected, cloud effect?*/

  return (
    <div className="relative w-screen h-screen">
      {showRain ? <RainEffect /> : <Starfall />}
      <div
        className="absolute inset-0"
        style={{
          ...(showRain
            ? {
                backgroundImage: `url(${getBackgroundImage()})`,
                backgroundSize: '80vw 88vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }
            : {
              }),
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(${getBackgroundImage()})`,
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
    </div>
  );
};

export default Dashboard;
