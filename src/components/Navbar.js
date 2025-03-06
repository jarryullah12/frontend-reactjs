import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">TravelLoop</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/blogs" className="hover:underline">Blogs</Link>
        <Link to="/best-places" className="hover:underline">Best Places</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
      <button className="bg-white text-blue-500 px-4 py-2 rounded">Book Now</button>
    </nav>
  );
};

export default Navbar;
