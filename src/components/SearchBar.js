import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-white p-4 shadow-lg flex justify-center space-x-4">
      <input type="text" placeholder="Search your Destination" className="border p-2 rounded"/>
      <input type="date" className="border p-2 rounded"/>
      <input type="number" placeholder="Max Price" className="border p-2 rounded"/>
      <button className="bg-blue-500 text-white px-6 py-2 rounded">Search Now</button>
    </div>
  );
};

export default SearchBar;
