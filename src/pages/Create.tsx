import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import OtherButton from '../OtherButton';
import Background from '../assets/enter_room_code.png';
import Loading from './Loading'
import restClient from "../utils/rest.util";

const Create: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 1;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      setLoading(false);
    }
  }, [imagesLoaded]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  async function createCafe(e: any) {
    e.preventDefault();
    const request = await restClient.post('/group/create', {
      data: {
        group_name: groupName
      },
      headers: { "Content-Type": "application/json" }
    });

    if (!request.success) {
      // setError(request.data)  // TODO: Implement error handling
      return
    }

    navigate("/dashboard");
  }

  return (
    <div>
      {loading && <Loading />}
      <div
        className="flex flex-col items-center justify-center h-screen relative"
        style={{ backgroundColor: '#472200' }}
      >
        <img
          src={Background}
          alt="Coffee Shop Background"
          className="h-[90vh] shadow-[0_0_40px_10px_rgba(255,255,255,0.4)] rounded-lg"
          onLoad={handleImageLoad}
        />
        <h1 className="absolute top-[11%] text-2xl font-bold bg-opacity-80 px- py-2 rounded-lg" style={{ fontFamily: "'Press Start 2P', cursive", color: "#472200" }} >
          Create New Cafe
        </h1>

        <div className="absolute top-[45%] w-[330px] p-6 rounded-lg flex flex-col items-center space-y-6">
          <div className="w-full bg-white rounded-lg shadow-md items-center">
            <input
              type="text"
              placeholder="Enter Your Cafe Name"
              className="w-full p-3 border rounded-lg text-lg"
              onChange={e => setGroupName(e.target.value)}
            />
          </div>
          <OtherButton onClick={createCafe}>
            Let's go!
          </OtherButton>
        </div>
      </div>
    </div>
  );
};

export default Create;