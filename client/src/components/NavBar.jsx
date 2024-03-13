import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import CalendarIcon from './CalendarIcon';
import ProfileIcon from './ProfileIcon';

function NavBar({centerText}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                component={Link}
                to="/"
              >
                <Typography variant="h5">remembrall</Typography>
              </IconButton>
              <CalendarIcon />
              <Box sx={{ flexGrow: 1 }} />
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <Typography variant="h5">{centerText}</Typography>
              </div>
              <Box sx={{ flexGrow: 1 }} />
              <ProfileIcon />
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  
  

export default NavBar;
