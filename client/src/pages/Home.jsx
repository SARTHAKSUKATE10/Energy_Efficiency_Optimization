import React from 'react';

const Home = ({ isMenuVisible }) => {
  return (
    <div
      style={{
        flex: isMenuVisible ? '0.7' : '0.85',
        display: 'flex',
        flexDirection: 'column', // Stack text on top of image
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'flex 0.3s ease',
        position: 'relative', // Enable absolute positioning for text
        height: '100vh', // Ensure it takes up full viewport height
        width: '100%', // Ensure it takes up full viewport width
        marginLeftL: '80vh',
        
      }}
    >
      <img
        src="https://images.pexels.com/photos/414807/pexels-photo-414807.jpeg"
        alt="Scenic View"
        style={{
          objectFit: 'cover',
          width: '130%',
          height: '100%',
          position: 'absolute', // Make image fill the container
          top: 0,
          left: 0,
          zIndex: -1, // Place image behind text content
        }}
      />

      <div
        style={{
          zIndex: 1,
          position: 'relative', // Ensures text is on top of image
          color: 'white',
          textAlign: 'center', // Center text horizontally
          padding: '20px', // Add some padding for better visibility
          marginLeft: '20%', // Center text vertically
          paddingTop: '-15%',
        }}
      >
        <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>
          Powering Smarter Cities: Energy Efficiency and Optimization Solutions
        </h1>
        <p style={{ fontSize: '18px', marginTop: '10px' }}>
          Unlocking sustainable energy solutions for a greener urban future.
        </p>
      </div>
    </div>
  );
};

export default Home;

