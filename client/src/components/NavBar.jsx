import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import CalendarIcon from './CalendarIcon';
import ProfileIcon from './ProfileIcon';

function NavBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={Link}
              to="/"
            >
              remembrall
            </IconButton>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
              <CalendarIcon />
              
            </div>
            <ProfileIcon />
          </Toolbar>
        </AppBar>
      </Box>  
    );
  }
  
  

export default NavBar;
