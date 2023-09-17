import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'rgb(251, 44, 55)' }}>
      <Toolbar>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          style={{ flexGrow: 1 }}
        >
          <img src="/logo.png" alt="logo" style={{ height: '40px', marginRight: '15px' }} />
          <Typography variant="h6" style={{ fontFamily: 'Minecraft' }}>
            NetStrike
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
