import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ slides, autoplaySpeed = 6000, height = "600px" }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-rotate slides
  useEffect(() => {
    if (!slides || slides.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setAnimating(true);
      setDirection(1);
      setTimeout(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setTimeout(() => {
          setAnimating(false);
        }, 100);
      }, 500);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [slides, autoplaySpeed, isPaused]);
  
  if (!slides || slides.length === 0) return null;
  
  const goToSlide = (index) => {
    if (animating) return;
    setAnimating(true);
    setDirection(index > currentSlideIndex ? 1 : -1);
    setTimeout(() => {
      setCurrentSlideIndex(index);
      setTimeout(() => {
        setAnimating(false);
      }, 100);
    }, 300);
  };

  const nextSlide = () => {
    if (animating) return;
    goToSlide((currentSlideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    if (animating) return;
    goToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
  };
  
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
      };
    }
  };
  
  return (
    <section 
      className="relative overflow-hidden" 
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlideIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 ease-out hover:scale-110"
            style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}
          >
            <div className={`absolute inset-0 bg-black ${slides[currentSlideIndex].overlayOpacity || 'bg-opacity-50'}`}></div>
          </div>
          
          <div className="container h-full flex items-center relative z-10">
            <motion.div 
              className={`max-w-xl text-white ${slides[currentSlideIndex].textAlign === 'right' ? 'text-right' : 'text-left'} px-4 md:px-0`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[currentSlideIndex].preTitle && (
                <motion.div 
                  className="text-sm md:text-base uppercase tracking-wider mb-2 text-primary font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {slides[currentSlideIndex].preTitle}
                </motion.div>
              )}
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {slides[currentSlideIndex].title}
              </motion.h1>
              {slides[currentSlideIndex].subtitle && (
                <motion.p 
                  className="text-white text-base md:text-lg lg:text-xl opacity-90 mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {slides[currentSlideIndex].subtitle}
                </motion.p>
              )}
              {slides[currentSlideIndex].buttonText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link 
                    to={slides[currentSlideIndex].buttonLink || "/shop"} 
                    className="bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 inline-flex items-center hover:shadow-lg hover:-translate-y-1"
                  >
                    {slides[currentSlideIndex].buttonText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  {slides[currentSlideIndex].secondaryButtonText && (
                    <Link 
                      to={slides[currentSlideIndex].secondaryButtonLink || "/shop"} 
                      className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-medium hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center hover:shadow-lg hover:-translate-y-1"
                    >
                      {slides[currentSlideIndex].secondaryButtonText}
                    </Link>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Slide number indicator */}
          <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2">
            <div className="text-white text-xl font-bold">{currentSlideIndex + 1}</div>
            <div className="w-8 h-px bg-white/50"></div>
            <div className="text-white/70 text-xl">{slides.length}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Slide Navigation Arrows */}
      <motion.button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-primary text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-primary text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex ? 'bg-primary w-6 md:w-8' : 'bg-white/50 w-2 md:w-3 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none z-10"></div>
      
      {/* Animated Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
      
      <motion.div 
        className="absolute top-32 left-10 w-12 h-12 md:w-20 md:h-20 border-2 border-white/20 rounded-full z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-32 right-10 w-10 h-10 md:w-16 md:h-16 border-2 border-white/20 rounded-full z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-5 h-5 md:w-8 md:h-8 border border-primary rounded-full z-10 hidden md:block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </section>
  );
};

export default HeroSlider; 