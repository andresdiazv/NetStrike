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
import './App.css';
import Ansi from 'react-ansi';
import io from 'socket.io-client';

function ConsoleOutput({ output }) {
  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#111', padding: '10px', color: '#FFF', overflow: 'auto' }}>
      <Ansi>
        {output}
      </Ansi>
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

    // Cleanup the listener when the component is unmounted
    return () => {
      socket.off('scan_update');
    };
  }, []);

  const handleScan = async () => {
    try {
      setIsScanning(true);
      let apiEndpoint;
      if (selectedScans.nmap) {
        apiEndpoint = "/api/nmap-scan";
      } else if (selectedScans.nuclei) {
        apiEndpoint = "/api/nuclei-scan";
      }
    
      console.log('Scanning IP:', ipAddress);

      const response = await axios.post(apiEndpoint, { ip: ipAddress });
      setResult(response.data.result);  // Updated to use setResult instead of setOutput
    } catch (error) {
      console.error("Error during scan:", error);
      setResult("An error occurred during the scan. Please try again."); // Same as above
    } finally {
      setIsScanning(false);
    }
  };

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
          >
            Honk Scan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display scan results if available */}
      {result && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Scan Results:</h3>
          <ConsoleOutput output={result} />  {/* Updated to use result instead of output */}
        </div>
      )}
    </Container>
  );
};

export default ButtonPanel;
