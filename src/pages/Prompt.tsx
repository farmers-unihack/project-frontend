import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import joinRoom from '../assets/join_room.png';
import createRoom from '../assets/create_room.png';
import Loading from './Loading'

function Prompt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 2;
  const [imageSrc, setImageSrc] = useState("");

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      setLoading(false);
    }
  }, [imagesLoaded]);

  const handleJoinRoom = (): void => {
    navigate('/join');
  };
  const handleCreateRoom = (): void => {
    navigate('/create');
  };

  return (
    <div>
      {loading && <Loading />}
      <div 
        style={{ backgroundColor: '#472200' }} 
        className="min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
      >
        <h1 
          style={{ fontFamily: "'Press Start 2P', cursive" }} 
          className="text-white text-3xl font-bold mb-25"
        >
          Choose your path...
        </h1>

        <div className="flex flex-row items-end space-x-40">
          <img 
            src={joinRoom} 
            alt="join room" 
            onClick={handleJoinRoom}
            className="w-auto h-100 transition-transform transform hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
            onLoad={handleImageLoad} 
          />
          <img 
            src={createRoom} 
            alt="create room" 
            onClick={handleCreateRoom}
            className="w-auto h-100 transition-transform transform hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
            onLoad={handleImageLoad} 
          />
        </div>
      </div>
    </div>
  );
}

export default Prompt;
