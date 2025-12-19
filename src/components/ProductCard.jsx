import { ShoppingBag, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Quick actions overlay */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        to={`/product/${product.id}`}
                        className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-black transition-colors"
                        title="Add to Cart"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate pr-2">
                        <Link to={`/product/${product.id}`}>
                            {product.title}
                        </Link>
                    </h3>
                    <p className="text-sm font-semibold text-primary">${product.price}</p>
                </div>
                <p className="text-xs text-gray-500 mb-2 capitalize">{product.category}</p>
            </div>
        </div>
    );
};

export default ProductCard;
