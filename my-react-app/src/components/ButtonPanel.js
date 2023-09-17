import React, { useState } from "react";
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
} from "@mui/material";

const ButtonPanel = ({ setScanResults }) => {
  const [open, setOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [result, setResult] = useState(null);
  const [selectedScanType, setSelectedScanType] = useState(null); // New state for tracking scan type

  const handleScan = () => {
    if (selectedScanType === "nmap") {
      // NMAP scan logic here...
      console.log("Scanning IP with NMAP:", ipAddress);
      fetch("/api/nmap-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: ipAddress }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setResult(data.result);
          }
        })
        .catch((err) => {
          console.error("Error during NMAP scan:", err);
          alert("Error occurred during the NMAP scan. Please try again.");
        });
    } else if (selectedScanType === "nuclei") {
      // Nuclei scan logic here...
      console.log("Scanning IP with Nuclei:", ipAddress);
      fetch("/api/nuclei-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: ipAddress }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setResult(data.result);
          }
        })
        .catch((err) => {
          console.error("Error during Nuclei scan:", err);
          alert("Error occurred during the Nuclei scan. Please try again.");
        });
    }

    setOpen(false);
  };

  const handleClickOpen = (type) => {
    setSelectedScanType(type); // Set the scan type when opening the dialog
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
            backgroundColor: "rgb(251, 44, 55)",
          }}
          onClick={() => handleClickOpen("nmap")} // Setting the scan type when clicked
        >
          Start NMAP Scan
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            margin: "10px",
            width: "500px",
            height: "100px",
            fontFamily: "Minecraft",
            backgroundColor: "rgb(251, 44, 55)",
          }}
          onClick={() => handleClickOpen("nuclei")} // Setting the scan type when clicked
        >
          Start Nuclei Scan
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
            Start Scan
          </Button>
        </DialogActions>
      </Dialog>

      {result && (
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "black",
          color: "red",
          border: "2px solid red",
          borderRadius: "5px",
          fontFamily: "Courier New, monospace",
          whiteSpace: "pre-wrap",
          overflow: "auto",
          maxHeight: "200px" // Change this value if you want a different height for the console display
        }}>
          <h3 style={{ color: "red" }}>Scan Results:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </Container>
  );
};

export default ButtonPanel;
