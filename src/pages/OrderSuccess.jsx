import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const { email } = location.state || { email: 'your email' };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8 max-w-md text-lg">
                Thank you for your purchase. We've sent a confirmation email to <span className="font-semibold text-gray-900">{email}</span>.
                Your order will be shipped within 2-3 business days.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/shop"
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-black transition-colors flex items-center gap-2"
                >
                    <ShoppingBag className="w-5 h-5" /> Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
