import React from "react";

const BestPlacesList = () => {
  const places = [
    {
      title: "Boat tour",
      location: "USA",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      price: "$100",
      category: "Cultural Relax",
      image: "/boat.jpg",
    },
    {
      title: "Taj Mahal",
      location: "India",
      description: "The Taj Mahal is an ivory-white marble mausoleum...",
      price: "$6700",
      category: "Cultural Relax",
      image: "/tajmahal.jpg",
    },
    {
      title: "Underwater",
      location: "US",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      price: "$6200",
      category: "Cultural Relax",
      image: "/underwater.jpg",
    },
    {
      title: "Sydney",
      location: "USA",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      price: "$6700",
      category: "Cultural Relax",
      image: "/sydney.jpg",
    },
    {
      title: "Los Angeles",
      location: "United States",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      price: "$6700",
      category: "Cultural Relax",
      image: "/losangeles.jpg",
    },
    {
      title: "Los Vegas",
      location: "California",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      price: "$6200",
      category: "Cultural Relax",
      image: "/losvegas.jpg",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Best Places to visit</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {places.map((place, index) => (
          <div key={index} className="shadow-lg p-4 rounded-lg bg-white">
            <img src={place.image} alt={place.title} className="rounded w-full h-40 object-cover"/>
            <h3 className="text-lg font-semibold mt-2">{place.title}</h3>
            <p className="text-gray-500"><i className="fas fa-map-marker-alt"></i> {place.location}</p>
            <p className="text-gray-600">{place.description}</p>
            <span className="block text-sm bg-gray-200 text-gray-700 px-2 py-1 mt-2 w-fit rounded">{place.category}</span>
            <p className="text-lg font-bold text-right mt-2">{place.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPlacesList;
