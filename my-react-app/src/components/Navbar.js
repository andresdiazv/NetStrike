
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'rgb(251, 44, 55)' }}>
      <Toolbar>
        <img src="/logo.png" alt="logo" style={{ height: '40px', marginRight: '15px' }} />
        <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Minecraft'}}>
          NetStrike
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

