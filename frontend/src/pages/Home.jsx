import React from 'react'
import Welcome from '../components/Welcome'
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div>
      <Welcome />
      <Navbar />
      <Slider />
    </div>
  )
}

export default Home;