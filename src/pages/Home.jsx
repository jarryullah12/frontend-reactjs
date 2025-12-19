import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice';

const Home = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(selectUser);

    useEffect(() => {
        // Fetch featured products from Fake Store API
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=4');
                const data = await response.json();
                setFeaturedProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center bg-[#f8f9fa] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent z-0" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-2xl space-y-8 animate-fade-in-up">
                        {user && (
                            <div className="mb-6 animate-fade-in-down">
                                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-light text-sm font-semibold mb-2 backdrop-blur-sm border border-primary/30">
                                    Welcome back, {user.name}
                                </span>
                            </div>
                        )}
                        <span className="inline-block px-4 py-1 bg-accent/10 text-accent font-semibold tracking-wide uppercase text-sm rounded-full">
                            New Collection 2024
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                            Elevate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Everyday Style
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-lg">
                            Discover the latest trends in fashion and lifestyle. Premium quality products curated just for you.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to="/shop"
                                className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-black transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                            >
                                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 border border-gray-200 font-semibold rounded-full hover:bg-gray-50 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative blob or image could go here */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-4/5 hidden lg:block mr-20 rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Fashion" className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                        <div className="h-1 w-20 bg-accent rounded-full"></div>
                    </div>
                    <Link to="/shop" className="text-accent font-medium hover:text-primary transition-colors flex items-center">
                        View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-[3/4] rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter/Banner Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Subscribe to our Newsletter</h2>
                        <p className="text-gray-400">Get the latest updates on new products and upcoming sales.</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-blue-600 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-3xl mix-blend-multiply filter"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-multiply filter"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
