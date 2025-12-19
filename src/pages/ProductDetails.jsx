import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2>Product not found</h2>
                <Link to="/shop" className="text-primary hover:underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Section */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[500px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold tracking-wide uppercase rounded-full mb-4">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center mb-6 space-x-4">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating?.rate || 0) ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({product.rating?.count} reviews)</span>
                        </div>
                        <p className="text-4xl font-bold text-primary mb-8">
                            ${product.price}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg border-b border-gray-100 pb-8">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="flex-1 bg-primary text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-black transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transform active:scale-95"
                        >
                            <ShoppingBag className="w-6 h-6" /> Add to Cart
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-8 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                            <Truck className="w-6 h-6 text-primary" />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield className="w-6 h-6 text-primary" />
                            <span>2 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <RotateCcw className="w-6 h-6 text-primary" />
                            <span>30 Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
