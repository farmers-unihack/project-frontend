
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PrettyButton from '../PrettyButton'
import coffeeShopImage from '../assets/coffee_shop_title.png';
import restClient from "../utils/rest.util";

function Login({ }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();
    const request = await restClient.post('/auth/login', {
      data: {
        username: username,
        password: password
      },
      headers: { "Content-Type": "application/json" }
    });

    console.log(request);

    if (!request.success) {
      console.log(request.data);
      setErrorMessage("Invalid username or password");
      return
    } else {
      setErrorMessage('');
    }

    localStorage.setItem("accessToken", request.data.token);
    localStorage.setItem("username", JSON.stringify(request.data.username));
    console.log(request.data);
    if (request.data.user_in_group) {
      navigate("/dashboard");
    } else {
      navigate("/prompt");
    }
  }

  return (
    <div style={{ backgroundColor: '#472200' }} className="min-h-screen flex 
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
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <span className='text-red-500 pl-3'>{errorMessage}</span>

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