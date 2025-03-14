import React from 'react'
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col 
                    items-center justify-center overflow-x-hidden"
    >
        Dashboard
    </div>
  );
}

export default Dashboard;
