import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


function LoginButton() {
  const navigate = useNavigate();   //navigate to the homeview
  const [isLoggedIn, setIsLoggedIn] = useState(false);  //track login status (status will change to true without authentication right now)

  const handleLogin = () => {
    /**
     * 
     * 
     * real login authentification process
     * 
     * 
     */

    setIsLoggedIn(true);    //update status to be authenticated

    //redirect to home screen upon successful login
    if (isLoggedIn) {
        navigate('/home');
    }
  };

  return (
    <Button variant="contained" onClick={handleLogin}>Login</Button>
  );
}


export default LoginButton;
