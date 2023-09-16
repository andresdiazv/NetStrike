import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressBar from './ProgressBar';  // Import the ProgressBar component

const socket = io('http://localhost:5000');  // Replace with your Flask server address

const ScanComponent = () => {
  const [progress, setProgress] = useState(0);
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    socket.on('scan_update', (message) => {
      console.log("Scan Update: ", message.update);
      setProgress(message.progress);  // Update progress
    });
  }, []);

  const startScan = () => {
    socket.emit('start_scan', { ip: ipAddress });  // Use the IP address from state
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter IP Address" 
        value={ipAddress} 
        onChange={(e) => setIpAddress(e.target.value)} 
      />
      <button onClick={startScan}>Start Scan</button>
      <ProgressBar progress={progress} />  {/* Render the ProgressBar component */}
    </div>
  );
};

export default ScanComponent;
