import React from 'react';
import Navbar from './components/Navbar';
import ButtonPanel from './components/ButtonPanel';
import ScanCard from './components/ScanCard';
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <div>
      <Navbar />
      <Container >
        <ButtonPanel />
        <ScanCard title="Scan Status">
          <Typography style={{ fontFamily: 'Minecraft' }}>
            {/* Your Scan Status content here */}
            Scan Status Information
          </Typography>
        </ScanCard>
        <ScanCard title="Scan History">
          <Typography style={{ fontFamily: 'Minecraft' }}>
            {/* Your Scan History content here */}
            Scan History Information
          </Typography>
        </ScanCard>
        <ScanCard title="Scan Reports">
          <Typography style={{ fontFamily: 'Minecraft' }}>
            {/* Your Scan Reports content here */}
            Scan Reports Information
          </Typography>
        </ScanCard>
      </Container>
    </div>
  );
};

export default App;
