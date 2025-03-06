import React from "react";

const BestPlaces = () => {
  const places = [
    { name: "Boat", country: "USA", price: "$6700", image: "/boat.jpg" },
    { name: "Taj Mahal", country: "India", price: "$6700", image: "/taj.jpg" },
    { name: "Underwater", country: "US", price: "$6200", image: "/underwater.jpg" }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Best Places to Visit</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {places.map((place, index) => (
          <div key={index} className="shadow-lg p-4 rounded">
            <img src={place.image} alt={place.name} className="rounded w-full h-40 object-cover"/>
            <h3 className="text-lg font-semibold mt-2">{place.name}</h3>
            <p className="text-gray-600">{place.country}</p>
            <p className="font-bold">{place.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPlaces;
