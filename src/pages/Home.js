import React from "react";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import BestPlaces from "../components/BestPlaces";
import Blogs from "../components/Blogs";
import Explore from "../components/Explore";
import Testimonials from "../components/Testimonials";


import Navbar from "../components/Navbar";
import BestPlacesList from "../components/BestPlacesList";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchBar />
      <BestPlaces />
      <Blogs />
      <Explore />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;


