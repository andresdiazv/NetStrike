import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from 'axios';
import '../App.css';
import io from 'socket.io-client';

function ConsoleOutput({ output }) {
  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '16px', 
      lineHeight: '1.5',
      backgroundColor: '#111',
      padding: '10px',
      color: '#FFF',
      overflowY: 'auto', 
      maxHeight: '400px',
      whiteSpace: 'pre-wrap' 
    }}>
      {output}
    </div>
  );
}

const ButtonPanel = () => {
  const [open, setOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [result, setResult] = useState('');
  const [selectedScans, setSelectedScans] = useState({
    nmap: false,
    nuclei: false,
  });
  const [isScanning, setIsScanning] = useState(false); // New state for tracking scanning status
  const socket = io('http://localhost:5000');
  
  useEffect(() => {
    // Listen for scan updates from the server
    socket.on('scan_update', (data) => {
      console.log(data.update);
      setResult(prevResult => `${prevResult}\n${data.update}`);
    });
    }, []);

  const handleCheckboxChange = (event) => {
    setSelectedScans({
      ...selectedScans,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScan = () => {
    if (isScanning) return;  // Prevent multiple scans at the same time
  
    setIsScanning(true);  // Set scanning status to true
  
    axios.post('http://localhost:5000/api/light-scan', {
      ip: ipAddress,
      selectedScans
    })
    .then(response => {
      console.log('Scan Results:', response.data);
      setResult(prevResult => `${prevResult}\nNmap: ${response.data.nmap}\nNuclei: ${response.data.nuclei}`);
      setIsScanning(false);  // Set scanning status to false
      handleClose();  // Close the dialog
    })
    .catch(error => {
      console.error('Scan Error:', error);
      setResult(prevResult => `${prevResult}\nError: ${error.message}`);
      setIsScanning(false);  // Set scanning status to false
    });
  };
  

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh" }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            margin: "10px",
            width: "500px",
            height: "100px",
            fontFamily: "Minecraft",
          }}
          onClick={handleClickOpen}
        >
          Start Scan
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontFamily: "Minecraft" }}>
          Enter IP Address
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "Minecraft" }}>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScans.nmap}
                onChange={handleCheckboxChange}
                name="nmap"
                color="primary"
              />
            }
            label="Nmap"
            style={{ fontFamily: "Minecraft" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScans.nuclei}
                onChange={handleCheckboxChange}
                name="nuclei"
                color="primary"
              />
            }
            label="Nuclei"
            style={{ fontFamily: "Minecraft" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ fontFamily: "Minecraft" }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
  onClick={handleScan}
  color="primary"
  style={{ fontFamily: "Minecraft" }}
  disabled={isScanning} // Disable the button while scanning
>
  {isScanning ? 'Scanning...' : 'Start Scan'}
</Button>

        </DialogActions>
      </Dialog>

      {result && (
  <div style={{ marginTop: "20px" }}>
    <h3>Scan Results:</h3>
    <div style={{ 
      border: '1px solid #333', // Optional border for visual clarity
      maxHeight: '400px', // Ensuring it doesn't stretch beyond this height
      overflowY: 'scroll' // Making sure content is scrollable if it exceeds the height
    }}>
      <ConsoleOutput output={result} />
    </div>
  </div>
)}
    </Container>
  );
};

export default ButtonPanel;