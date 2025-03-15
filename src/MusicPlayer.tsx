import React, { useState, useRef } from 'react';
import playIcon from './assets/play_button.png';
import soundTrack from './assets/colourful_flowers.mp3'

const MusicPlayer: React.FC = () => {
const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef(new Audio(soundTrack));

const togglePlayPause = () => {
    if (isPlaying) {
    audioRef.current.pause();
    } else {
    audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
};

return (
  <button 
    onClick={togglePlayPause} 
    className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-3 pointer-events-auto"
    style={{
        background: 'none', 
        border: 'none', 
        opacity: isPlaying ? 0 : 1, 
    }}
    >
    <img 
        src={playIcon} 
        alt="Play" 
        className="w-15 h-15 transition-opacity"
    />
  </button>
);
};

export default MusicPlayer;