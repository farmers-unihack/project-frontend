import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import joinRoom from '../assets/join_room.png';
import createRoom from '../assets/create_room.png';
import Loading from './Loading'
import restClient from '../utils/rest.util';
import LogoutButton from '../LogoutButton';

function Prompt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [meLoading, setMeLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 2;
  const [imageSrc, setImageSrc] = useState("");

  async function handleMe() {
    const res = await restClient.get('/user/me');

    if (!res.success) {
      console.log("failed")
      return;  // TODO: this should never happen
    }

    setTimeout(() => {
      setMeLoading(false);
    }, 2000);

    if (res.data.in_group) {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMeLoading(false);
      navigate("/");
    }
    else {  // Case where you are logged in
      handleMe();
    }
  }, [navigate]);

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
      {(loading || meLoading) && <Loading />}
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
        <LogoutButton />
      </div>

    </div>
  );
}

export default Prompt;
