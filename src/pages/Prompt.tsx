import React from 'react';
import { useNavigate } from "react-router-dom";
import joinRoom from '../assets/join_room.png';
import createRoom from '../assets/create_room.png';

function Prompt() {
  const navigate = useNavigate();

  return (
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
          className="w-auto h-100 transition-transform transform hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
        />
        <img 
          src={createRoom} 
          alt="create room" 
          className="w-auto h-100 transition-transform transform hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
        />
      </div>
    </div>
  );
}

export default Prompt;
