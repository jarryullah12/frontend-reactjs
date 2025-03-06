import logo from './logo.svg';
import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BestPlaces from "./pages/BestPlaces";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/best-places" element={<BestPlaces />} />
    </Routes>
  </BrowserRouter>
  </>
  );
 
}



export default App;
