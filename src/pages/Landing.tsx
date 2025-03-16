import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingButton from '../LandingButton'
import coffeeShopImage from '../assets/coffee_shop_title.png';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/prompt");
    }
  }, [navigate]);


  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div style={{ backgroundColor: '#472200' }} className="min-h-screen flex flex-col 
                    items-center justify-center overflow-x-hidden"
    >
      <h1 style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-white text-l font-bold">Welcome To Your Favourite Coffee Shop</h1>
      <img 
          src={coffeeShopImage} 
          alt="Coffee Shop Logo" 
          className="w-auto h-50"
        />

      <LandingButton onClick={register}>New here? Join us!</LandingButton>
      <LandingButton onClick={login}>Login</LandingButton>
    </div>
  );
}

export default Landing;