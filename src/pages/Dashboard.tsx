import React from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.png';
import DashboardButton from '../DashboardButton';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-screen h-screen flex items-center justify-center bg-gray-200"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '80vw 88vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-4 left-4 flex flex-col space-y-20">
        <DashboardButton
          className="px-6 py-2 text-white bg-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-700"
          style={{ fontSize: "28px" }}
        >
          Tasks
        </DashboardButton>
        <DashboardButton
          className="px-6 py-2 text-white bg-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-700"
          style={{ fontSize: "28px" }}
        >
          Insights
        </DashboardButton>
      </div>
    </div>
  );
}

export default Dashboard;
