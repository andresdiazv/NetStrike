import React from 'react';
import { Button, Container, Box } from '@mui/material';

const ButtonPanel = () => {
  return (
    <Container>
      <Box 
        display="flex" 
        flexDirection="row"  
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: '10vh' }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          style={{ margin: '10px', width: '200px', height: '100px', fontFamily: 'Minecraft' }}  // Adjusted size
        >
          Start Scan
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          style={{ margin: '10px', width: '200px', height: '100px', fontFamily: 'Minecraft' }}  // Adjusted size
        >
          View Status
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          style={{ margin: '10px', width: '200px', height: '100px', fontFamily: 'Minecraft' }}  // Adjusted size
        >
          Scan History
        </Button>
      </Box>
    </Container>
  );
};

export default ButtonPanel;
