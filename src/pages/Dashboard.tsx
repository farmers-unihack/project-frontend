import React, { useEffect, useState } from 'react';
import one_cat from '../assets/game_states/one-cat.png';
import two_cat from '../assets/cat_layers/second_cat.png';
import third_cat from '../assets/cat_layers/third_cat.png';
import fourth_cat from '../assets/cat_layers/fourth_cat.png';
import InsightsModal from "../InsightsModal";
import Cloud from "../Cloud";
import BlocklistModal from "../BlocklistModal";
import soundBarImage from '../assets/sound_bar.png';
import Modal from '../Modal';
import RainEffect from '../RainEffect';
import Starfall from '../Starfall';
import MusicPlayer from '../MusicPlayer';
import bush from '../assets/bush.png'
import darkBush from '../assets/darkbush.png'
import CollectibleComponents from '../CollectibleComponents';
import moon from '../assets/moon.png';
import cloud from '../assets/cloud.png';
import restClient from '../utils/rest.util';


const Dashboard: React.FC = () => {
  const POLLING_INTERVAL = 60e3; // 1 minute
  const [activeUsers, setActiveUsers] = useState<{ username: string }[]>([]);
  const [totalFocusTime, setTotalFocusTime] = useState<number>(0); // in seconds
  const [collectibles, setCollectibles] = useState([]);

  const [isInsightsOpen, setIsInsightsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBlocklistOpen, setIsBlocklistOpen] = useState<boolean>(false);
  const [showRain, setShowRain] = useState<boolean>(true);

  const openInsights = (): void => setIsInsightsOpen(true);
  const closeInsights = (): void => setIsInsightsOpen(false);
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const openBlocklist = (): void => setIsBlocklistOpen(true);
  const closeBlocklist = (): void => setIsBlocklistOpen(false);
  const toggleRain = (): void => setShowRain(prev => !prev);

  const pollGroupStatus = async () => {
    try {
      const response = await restClient.get('/group/poll');
      if (response.success) {
        setActiveUsers(response.data.active_users);
        setTotalFocusTime(response.data.total_time);
        setCollectibles(response.data.collectibles);
      }
    } catch (error) {
      console.error('Failed to poll group status', error);
    }
  }

  useEffect(() => {
    pollGroupStatus();
    const interval = setInterval(() => {
      pollGroupStatus();
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getCatLayer = (index: number) => {
    switch (index) {
      case 0:
        return two_cat
      case 1:
        return third_cat
      case 2:
        return fourth_cat
    }
    return undefined
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: showRain ? "#71687a" : "#a7cbef",
        }}
      >
        {showRain ? <RainEffect /> : <Starfall />}
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Cloud animationClass="animate-cloud1" top="5%" left="-200px" />
        <Cloud animationClass="animate-cloud2" top="15%" left="-300px" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${one_cat})`,
          backgroundSize: '90vw 90vh',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'calc(50% + 8vw) calc(50% - 10vh)',
          zIndex: 1,
        }}
      />

      {activeUsers.map((_, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getCatLayer(index)})`,
            backgroundSize: '90vw 90vh',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'calc(50% + 8vw) calc(50% - 10vh)',
            zIndex: 2,
          }}
        />
      ))}

      <CollectibleComponents />
      <div className="absolute inset-0 z-30">
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow"></div>
          <div className="flex flex-row justify-between m-5">
            <div className="flex flex-row space-x-20">
              <div className="relative inline-block hover:scale-110" onClick={openModal}>
                <img src={showRain ? darkBush : bush} alt="Modal Frame" className="h-35" />
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute text-white top-[66%] left-[30%] text-l">
                  Tasks
                </span>
              </div >
              <div className="relative inline-block hover:scale-110" onClick={openInsights}>
                <img src={showRain ? darkBush : bush} alt="Modal Frame" className="h-35" />
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute text-white top-[66%] left-[21%] text-l">
                  Insights
                </span>
              </div>
            </div>

            <div>
              <div>
                <img
                  src={soundBarImage}
                  alt="Sound Bar"
                  className="w-[300px] h-[100px] mt-10"
                />
                <MusicPlayer />
              </div>
            </div>

            <div className="flex flex-row space-x-20">
              <div className="relative inline-block hover:scale-110" onClick={openBlocklist}>
                <img src={showRain ? darkBush : bush} alt="Modal Frame" className="h-35" />
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute text-white top-[66%] left-[20%] text-l">
                  Blocklist
                </span>
              </div>
              <div className="relative inline-block hover:scale-110">
                <img src={showRain ? darkBush : bush} alt="Modal Frame" className="h-35" />
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute text-white top-[66%] left-[18%] text-l">
                  Inventory
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <img
            className="hover:scale-110"
            src={showRain ? cloud : moon}
            alt="Toggle Rain"
            onClick={toggleRain}
            style={{ width: '80px', cursor: 'pointer' }}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        <InsightsModal isOpen={isInsightsOpen} onClose={closeInsights} totalFocusTime={totalFocusTime} />
        <BlocklistModal isOpen={isBlocklistOpen} onClose={closeBlocklist} />
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
