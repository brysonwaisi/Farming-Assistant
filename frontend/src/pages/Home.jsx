import React from 'react'
import Welcome from '../components/Welcome'
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';

const Home = () => {
  return (
    <div>
      <Welcome />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
    </div>
  )
}

export default Home;