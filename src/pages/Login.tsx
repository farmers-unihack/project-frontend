
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PrettyButton from '../PrettyButton'
import coffeeShopImage from '../assets/coffee_shop_title.png';

function Login({}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = (e: any) => {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div  style={{ backgroundColor: '#472200' }} className="min-h-screen flex 
                    flex-col items-center justify-center"
    >
    <img 
          src={coffeeShopImage} 
          alt="Coffee Shop Logo" 
          className="w-auto h-30" // You can adjust the size as needed
        />
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 style={{ color: '#472200' }} className="text-4xl font-bold mb-4 text-center">Login</h2>
        
        <Box 
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { m: 1.5 }
          }}
          noValidate
          onSubmit={login}
        >      
          <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <PrettyButton 
            type="submit"
          >
            Login
          </PrettyButton>
        </Box>

        <Link className="p-5 text-gray-500 hover:underline" to="/register">
          New here? Click here to join!
        </Link>
      </div>
    </div>
  );
}

export default Login