import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="app" style={{ display: 'flex', justifyContent: 'space-between', height: '100vh' }}>
      {/* Navbar Component */}
      <div style={{ flex: 1 }}>
        <Navbar />
      </div>

      {/* Video Player on the Right */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <video
          style={{ objectFit: 'cover', height: '100%' }}
          width="100%"
          autoPlay
          loop
          muted
          controls
        >
          <source src="C:\Users\VRUTTIK MORAGHA\Desktop\App\Energy_Efficiency_Optimization\client\src\assets\Energy_Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default App;





