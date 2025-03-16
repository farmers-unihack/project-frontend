import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from './assets/home.png';
import restClient from './utils/rest.util';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();


  async function handleHome(e: any) {

    e.preventDefault();

    await restClient.post('/group/leave');

    navigate('/prompt');
  };

  return (
    <button
      onClick={handleHome}
      className="absolute top-4 md:top-10 left-3 md:left-7 hover:scale-110"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={homeIcon}
        alt="Home"
        className="aspect-w-1 aspect-h-1 w-16 sm:w-20 md:w-24 lg:w-28 max-w-32"
      />
    </button>
  );
};

export default HomeButton;
