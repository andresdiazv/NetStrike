import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#ccc' }}>
      <div style={{ width: `${progress}%`, backgroundColor: '#4caf50', textAlign: 'center', color: 'white' }}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
