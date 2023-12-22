import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home_container">
      <h2>Welcome to Stationary Shop!</h2>
      <div className="shop_info">
          <p>Stationary Shop is a one-stop shop for all your stationary needs. We have a wide variety of stationary items to choose from.</p>
          <p>Our shop is located at:</p>
          <p>1234 Stationary Shop Lane</p>
          <p>Stationary, ST 12345</p>
      </div>
    </div>
  );
};

export default Home;
