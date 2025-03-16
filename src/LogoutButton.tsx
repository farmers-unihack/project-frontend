import React from 'react';
import { useNavigate } from 'react-router-dom';
import restClient from './utils/rest.util';
import logoutIcon from './assets/logout.png';

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault()

    localStorage.removeItem('accessToken');

    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="relative inline-block hover:scale-110"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={logoutIcon}
        alt="Logout"
        className="h-35" 
        />
    </button>
  );
};

export default LogoutButton;
