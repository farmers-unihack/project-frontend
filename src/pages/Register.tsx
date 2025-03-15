import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PrettyButton from '../PrettyButton'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import coffeeShopImage from '../assets/coffee_shop_title.png';
import restClient from "../utils/rest.util";

function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const register = async (e: any) => {
    e.preventDefault();

    const request = await restClient.post('/auth/register', {
      data: {
        username: username,
        password: password
      },
      headers: { "Content-Type": "application/json" }
    });

    if (!request.success) {
      // setError(request.data)  // TODO: Handle error
      return
    }
    navigate("/login");
  }

  return (
    <div style={{ backgroundColor: '#472200' }} className="bg-orange-900 min-h-screen flex flex-col
                    items-center justify-center"
    >
      <img
        src={coffeeShopImage}
        alt="Coffee Shop Logo"
        className="w-auto h-30" // You can adjust the size as needed
      />
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 style={{ color: '#472200' }} className="text-4xl font-bold mb-4 text-center">Register</h2>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { m: 1.5 }
          }}
          noValidate
          onSubmit={register}
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
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <PrettyButton
            type="submit"
          >
            Register
          </PrettyButton>
        </Box>

        <Link className="p-5 text-gray-500 hover:underline" to="/login">
          Already joined? Click here to login!
        </Link>
      </div>
    </div>
  );
}

export default Register