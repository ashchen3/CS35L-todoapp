import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function LoginButton() {
  const navigate = useNavigate();   //navigate to the homeview
  const [isLoggedIn, setIsLoggedIn] = useState(false);  //track login status (status will change to true without authentication right now)
  const [username, setUsername] = useState(''); // Track username input
  const [password, setPassword] = useState(''); // Track password input


  const handleLogin = () => {
    /**
     * 
     * 
     * real login authentification process
     * 
     * 
     */

    setIsLoggedIn(true);    //update status to be authenticated

    //redirect to home view upon successful login
    navigate('/home');
    
  };



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2, // Adds space between elements
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
}


export default LoginButton;
