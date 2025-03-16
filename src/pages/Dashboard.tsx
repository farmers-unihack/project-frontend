import React, { useEffect, useState } from 'react';
import one_cat from '../assets/game_states/one-cat.png';
import two_cat from '../assets/cat_layers/second_cat.png';
import third_cat from '../assets/cat_layers/third_cat.png';
import fourth_cat from '../assets/cat_layers/fourth_cat.png';
import InsightsModal from "../InsightsModal";
import Cloud from "../Cloud";
import BlocklistModal from "../BlocklistModal";
import { useNavigate } from 'react-router-dom';
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
import Loading from './Loading'
import InventoryModal from "../InventoryModal";
import HomeButton from '../HomeButton';
import LogoutButton from '../LogoutButton';
import roomCodeSign from '../assets/room_code_sign.png';

const Dashboard: React.FC = () => {
  const POLLING_INTERVAL = 10e3; // 1 minute
  const [activeUsers, setActiveUsers] = useState<{ username: string }[]>([]);
  const [totalFocusTime, setTotalFocusTime] = useState<number>(0); // in seconds
  const [collectibles, setCollectibles] = useState<{ id: string }[]>([]);

  const [isInsightsOpen, setIsInsightsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBlocklistOpen, setIsBlocklistOpen] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [showRain, setShowRain] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [roomCode, setRoomCode] = useState<string>('');
  const [meLoading, setMeLoading] = useState(true);
  const [userLeaderboard, setUserLeaderboard] = useState<{ username: string, focus_time_seconds: number }[]>([]);

  useEffect(() => {
    const img = new Image();
    img.src = one_cat;

    img.onload = () => {
      setLoading(false);
    };

    const fetchRoomCode = async () => {
      try {
        const response = await restClient.get('/group/invite');
        if (response.success) {
          setRoomCode(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch room code', error);
      }
    }
    fetchRoomCode();
  }, []);

  const copyInviteCode = () => {
    // pop up a notification
    
    navigator.clipboard.writeText(roomCode);
  }

  const navigate = useNavigate();

  async function handleMe() {
    const res = await restClient.get('/user/me');

    if (!res.success) {
      console.log("failed")
      return;  // TODO: this should never happen
    }

    setTimeout(() => {
      setMeLoading(false);
    }, 2000);

    if (!res.data.in_group) {
      navigate("/prompt");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }
    else {
      handleMe();
    }
  }, [navigate]);

  const openInsights = (): void => setIsInsightsOpen(true);
  const closeInsights = (): void => setIsInsightsOpen(false);
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const openBlocklist = (): void => setIsBlocklistOpen(true);
  const closeBlocklist = (): void => setIsBlocklistOpen(false);
  const toggleRain = (): void => setShowRain(prev => !prev);
  const openInventory = (): void => setIsInventoryOpen(true);
  const closeInventory = (): void => setIsInventoryOpen(false);

  const pollGroupStatus = async () => {
    try {
      const response = await restClient.get('/group/poll');
      if (response.success) {
        console.log(response)
        setActiveUsers(response.data.active_users);
        setTotalFocusTime(Math.round(response.data.total_time_seconds / 3600));
        // setCollectibles(response.data.collectibles.id);
        setCollectibles([]);
        setUserLeaderboard(response.data.users);
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
    <div>
      {(loading || meLoading) && <Loading />}
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

        <CollectibleComponents collectibleList={collectibles.map(collectible => collectible.id)} />
        <div className="absolute inset-0 z-30">
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-between m-5">
              <div className="flex flex-row space-x-20 flex-grow">
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
                  <div className="relative inline-block hover:scale-110" onClick={openInventory}>
                    <img src={showRain ? darkBush : bush} alt="Modal Frame" className="h-35" />
                    <span style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute text-white top-[66%] left-[18%] text-l">
                      Inventory
                    </span>
                  </div>
                </div>
              </div>
              <HomeButton />
              <LogoutButton />
              <div className="absolute top-0 left-45 hover:scale-110" onClick={copyInviteCode}>
                <img
                  src={roomCodeSign}
                  alt="Sign"
                  style={{ width: '200px' }}
                />
                <div style={{ fontFamily: "'Press Start 2P', cursive" }} className="absolute top-4/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                  {roomCode}
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
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <InsightsModal isOpen={isInsightsOpen} onClose={closeInsights} totalFocusTime={totalFocusTime} userLeaderboard={userLeaderboard}  />
          <BlocklistModal isOpen={isBlocklistOpen} onClose={closeBlocklist} />
          <InventoryModal isOpen={isInventoryOpen} onClose={closeInventory} unlockedCollectibles={collectibles.map(collectible => collectible.id)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
