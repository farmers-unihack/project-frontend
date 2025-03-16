import React, { useState, useRef } from 'react';
import playIcon from './assets/play-one.png';
import pauseIcon from './assets/pause.png';
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
      className="absolute bottom-[-0.6%] left-[50%] transform -translate-x-1/2 p-3 pointer-events-auto"
    >
      {!isPlaying ? <img
        src={playIcon}
        alt="Play"
        className="w-15 h-15 transition-opacity"
      /> : <img
        src={pauseIcon}
        alt="Play"
        className="w-15 h-15 transition-opacity"
      />}

    </button>
  );
};

export default MusicPlayer;