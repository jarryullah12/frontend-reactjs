import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl font-bold">Search Your Destination</h1>
        <p className="mt-2">Find the best travel experiences worldwide.</p>
        <button className="mt-4 bg-blue-500 px-6 py-2 rounded">Search Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
