import React from 'react';
import { useNavigate } from 'react-router-dom';
import restClient from './utils/rest.util';
import logoutIcon from './assets/logout.png';

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault()

    localStorage.removeItem('accessToken');

    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-40 left-4"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={logoutIcon}
        alt="Logout"
        className="w-34 h-34" 
        />
    </button>
  );
};

export default LogoutButton;
