import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

const Cart = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <ShoppingBag className="w-20 h-20 text-gray-300 mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    to="/shop"
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-black transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">

                {/* Cart Items */}
                <section className="lg:col-span-7">
                    <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex">
                                <CartItem item={item} />
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between">
                        <Link to="/shop" className="flex items-center text-primary hover:text-gray-900 font-medium transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                        </Link>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 rounded-2xl px-4 py-6 sm:p-6 lg:p-8">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Shipping estimate</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">${(cartTotal + 5).toFixed(2)}</dd>
                        </div>
                    </dl>

                    <div className="mt-8">
                        <Link
                            to="/checkout"
                            className="block w-full bg-primary text-center text-white border border-transparent rounded-full shadow-lg shadow-primary/30 py-4 px-4 text-base font-bold hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary transition-all"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cart;
