import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ 
  title = "Premium Quality Products", 
  subtitle = "Discover our latest collection of fashion products",
  ctaText = "Shop Now",
  ctaLink = "/shop",
  imageSrc = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", 
  overlayOpacity = "bg-opacity-40",
  textAlign = "left",
  imagePosition = "center"
}) => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Hero Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-5000 hover:scale-105"
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: imagePosition
        }}
      >
        <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      </div>
      
      {/* Content */}
      <div className="container h-full relative z-10">
        <div className={`h-full flex items-center ${textAlign === 'right' ? 'justify-end' : textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
          <motion.div 
            className={`max-w-xl text-white ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">{subtitle}</p>
            <Link 
              to={ctaLink}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center hover:shadow-lg"
            >
              {ctaText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Animated Shapes */}
      <motion.div 
        className="absolute top-32 left-10 w-20 h-20 border-2 border-white/20 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-32 right-10 w-16 h-16 border-2 border-white/20 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </section>
  );
};

export default Hero;

 