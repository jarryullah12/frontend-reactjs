import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryFeature = ({ category, index = 0 }) => {
  // Animation delay based on index for staggered effect
  const animationDelay = `${index * 100}ms`;
  
  return (
    <div 
      className="group relative overflow-hidden rounded-lg h-[300px] transform transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
      style={{ animationDelay }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 transform transition-all duration-300 translate-y-0 group-hover:-translate-y-2">{category.title}</h3>
        <p className="text-white/80 mb-4 transform transition-all duration-300 translate-y-0 group-hover:-translate-y-2 delay-75">{category.description}</p>
        <Link 
          to={category.link || "/shop"} 
          className="inline-block border-b-2 border-white pb-1 font-medium transform transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Shop Now
          <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </div>
      
      {/* Decorative animated element */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/20 blur-xl opacity-0 transition-all duration-700 group-hover:opacity-70"></div>
    </div>
  );
};

export const CategoryFeatureGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <div 
          key={category.id} 
          className="transform transition-all duration-500 hover:-translate-y-2 category-animate"
          style={{ 
            animationName: 'fadeInUp',
            animationDuration: '0.6s', 
            animationDelay: `${index * 0.1}s`, 
            animationFillMode: 'both' 
          }}
        >
          <CategoryFeature category={category} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CategoryFeatureGrid; 