import React from "react";

const Testimonials = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Testimonials</h2>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="shadow-lg p-4 rounded bg-white w-1/3">
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-gray-600">Amazing travel experience!</p>
        </div>
        <div className="shadow-lg p-4 rounded bg-white w-1/3">
          <h3 className="text-lg font-semibold">Smith</h3>
          <p className="text-gray-600">Loved every moment of the trip!</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
