import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { CategoryFeatureGrid } from '../components/CategoryFeature';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('best-seller');
  const [isVisible, setIsVisible] = useState({
    categories: false,
    products: false,
    banner: false,
    brands: false
  });

  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate when sections come into view
      setIsVisible({
        categories: scrollPosition > windowHeight * 0.2,
        products: scrollPosition > windowHeight * 0.6,
        banner: scrollPosition > windowHeight * 1.2,
        brands: scrollPosition > windowHeight * 1.6
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products from Redux store
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "NEW ARRIVALS",
      subtitle: "Shop the latest fashion collection",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "/about",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      overlayOpacity: "bg-opacity-40"
    },
    {
      id: 2,
      title: "SUMMER SALE",
      subtitle: "Up to 50% off on selected items",
      buttonText: "View Offers",
      buttonLink: "/shop?sale=true",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      overlayOpacity: "bg-opacity-45"
    },
    {
      id: 3,
      title: "PREMIUM ACCESSORIES",
      subtitle: "Elevate your style with luxury accessories",
      buttonText: "Explore Collection",
      buttonLink: "/shop?category=accessories",
      secondaryButtonText: "View Lookbook",
      secondaryButtonLink: "/lookbook",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      overlayOpacity: "bg-opacity-50"
    }
  ];

  // Category features data
  const categoryFeatures = [
    {
      id: 1,
      title: "Men's Collection",
      description: "Latest styles and trends",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/shop?category=men"
    },
    {
      id: 2,
      title: "Women's Collection",
      description: "Elegant and stylish",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/shop?category=women"
    },
    {
      id: 3,
      title: "Accessories",
      description: "Complete your look",
      image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/shop?category=accessories"
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab);

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="overflow-hidden">
      {/* Hero Slider Section */}
      <HeroSlider slides={heroSlides} height="600px" />
      
      {/* Featured Categories */}
      <motion.section 
        className="py-16 relative"
        initial="hidden"
        animate={isVisible.categories ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="container relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Shop by Category
          </motion.h2>
          <CategoryFeatureGrid categories={categoryFeatures} />
        </div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary rounded-full opacity-10 -translate-x-12"></div>
        <div className="absolute bottom-12 right-8 w-32 h-32 bg-primary rounded-full opacity-10"></div>
      </motion.section>
      
      {/* Product Categories */}
      <motion.section 
        className="py-16 bg-gray-50 relative overflow-hidden"
        initial="hidden"
        animate={isVisible.products ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="container relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            variants={fadeInUp}
          >
            Featured Products
          </motion.h2>
          
          <motion.div 
            className="flex border-b justify-center mb-8"
            variants={fadeInUp}
          >
            <button 
              className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'best-seller' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('best-seller')}
            >
              Best Seller
            </button>
            <button 
              className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'new-products' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('new-products')}
            >
              New Products
            </button>
            <button 
              className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'sale-products' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('sale-products')}
            >
              Sale Products
            </button>
            <button 
              className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'tshirts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('tshirts')}
            >
              Tshirts
            </button>
          </motion.div>
          
          {/* Product Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp} 
                custom={index}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* View All Button */}
          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
          >
            <Link 
              to="/shop" 
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 inline-block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>
      </motion.section>
      
      {/* Promotional Banner */}
      <motion.section 
        className="relative h-[400px] overflow-hidden"
        initial="hidden"
        animate={isVisible.banner ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container h-full flex items-center justify-end relative z-10">
          <motion.div 
            className="max-w-md text-white text-right"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Summer Sale</h2>
            <p className="text-xl opacity-90 mb-8">Get up to 50% off on selected items</p>
            <Link 
              to="/shop?sale=true" 
              className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Shop the Sale
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Brand Logos */}
      <motion.section 
        className="py-16 overflow-hidden"
        initial="hidden"
        animate={isVisible.brands ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            variants={fadeInUp}
          >
            Our Brands
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-12"
            variants={staggerContainer}
          >
            {[
              { src: "/images/brands/nike.svg", alt: "Nike" },
              { src: "/images/brands/adidas.svg", alt: "Adidas" },
              { src: "/images/brands/puma.svg", alt: "Puma" },
              { src: "/images/brands/zara.svg", alt: "Zara" },
              { src: "/images/brands/calvin-klein.svg", alt: "Calvin Klein" }
            ].map((brand, index) => (
              <motion.img 
                key={index}
                src={brand.src} 
                alt={brand.alt} 
                className="h-12 transition-all duration-300 hover:scale-110 filter grayscale hover:grayscale-0" 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
