import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ButtonPanel from './components/ButtonPanel';
import ScanCard from './components/ScanCard';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [scanResults, setScanResults] = useState(null);

  return (
    <div>
      <Navbar />
      <Container>
        <ButtonPanel setScanResults={setScanResults} />
        <ScanCard title="Scan Reports">
          <Typography style={{ fontFamily: 'Minecraft' }}>
            {scanResults ? JSON.stringify(scanResults, null, 2) : "Scan Reports Information"}
          </Typography>
        </ScanCard>
        <ScanCard title="Scan History">
          <Typography style={{ fontFamily: 'Minecraft' }}>
            Scan History Information
          </Typography>
        </ScanCard>
      </Container>
    </div>
  );
};

export default App;
