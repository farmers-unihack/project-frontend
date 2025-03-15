import React from 'react';
import PrettyButton from '../PrettyButton';
import Background from '../assets/enter_room_code.png';

const Join: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center min-h-screen relative bg-white"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="absolute top-[12%] text-5xl font-bold bg-opacity-80 px- py-2 rounded-lg">
        Join a Cafe
      </h1>

      <div className="absolute top-[45%] w-[330px] p-6 rounded-lg flex flex-col items-center space-y-6">
      <div className="w-full bg-white rounded-lg shadow-md items-center">
          <input
            type="text"
            placeholder="Enter Cafe Room Code"
            className="w-full p-3 border rounded-lg text-lg"
          />
        </div>
        <PrettyButton style={{ width: "220px", fontSize: "24px",  height: "70px", backgroundColor: "#ffdcd3", color: "#492e16", padding: "12px 24px" }}>
          Let's go!
        </PrettyButton>
      </div>
    </div>
  );
};

export default Join;
