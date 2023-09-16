import React, { useState } from 'react';
import { Button, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const ButtonPanel = () => {
  const [open, setOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScan = () => {
    // Perform the scan with the ipAddress
    console.log('Scanning IP:', ipAddress);
    setOpen(false);
  };

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
          style={{ margin: '10px', width: '500px', height: '100px', fontFamily: 'Minecraft' }}
          onClick={handleClickOpen}  // Open the dialog when clicked
        >
          Start Scan
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontFamily: 'Minecraft' }}>Enter IP Address</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: 'Minecraft' }}>
            Please enter the IP address you want to scan.
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            label="IP Address"
            type="text"
            fullWidth 
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontFamily: 'Minecraft' }} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleScan} 
            color="primary" 
            style={{ fontFamily: 'Minecraft' }}  // Minecraft font
          >
            Start Scan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ButtonPanel;
