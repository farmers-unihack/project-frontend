import React from 'react'
import { useNavigate } from "react-router-dom";

function Prompt() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col 
                    items-center justify-center overflow-x-hidden"
    >
        prompt
    </div>
  );
}

export default Prompt;
