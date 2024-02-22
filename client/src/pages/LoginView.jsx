import React from "react";
import LoginButton from "../components/LoginButton";
import Box from "@mui/material/Box";


/**
 * Contains the following components: 
 * - LoginButton
 */


function LoginView() {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>      
      <LoginButton />
    </Box>
  );
}


export default LoginView;
