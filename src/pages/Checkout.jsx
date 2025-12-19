import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotal, clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (paymentMethod === 'paypal') {
            setTimeout(() => {
                dispatch(clearCart());
                window.location.href = "https://www.paypal.com";
            }, 1000);
            return;
        }

        // Simulate payment processing for other methods
        setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);
            dispatch(clearCart());
            navigate('/order-success', { state: { email: formData.email } });
        }, 2000);
    };

    if (orderComplete) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Thank you for your purchase. We've sent a confirmation email to {formData.email}. Your order will be shipped within 2-3 business days.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-black transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">Checkout</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                {/* Checkout Form */}
                <section className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" /> Contact Information
                            </h2>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Postal code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        pattern="[0-9]{5}"
                                        title="Please enter a valid 5-digit zip code"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="card"
                                        name="paymentMethod"
                                        type="radio"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                                        Credit Card
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                        PayPal
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                                        Cash on Delivery (COD)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Conditional Payment Info */}
                        {paymentMethod === 'card' && (
                            <div className="animate-fade-in-down">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Card Details</h3>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on card</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            required={paymentMethod === 'card'}
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="0000 0000 0000 0000"
                                            required={paymentMethod === 'card'}
                                            pattern="[0-9]{16}"
                                            maxLength="16"
                                            title="Please enter a valid 16-digit card number"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            required={paymentMethod === 'card'}
                                            placeholder="MM/YY"
                                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                            maxLength="5"
                                            title="Format: MM/YY"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            required={paymentMethod === 'card'}
                                            placeholder="123"
                                            pattern="[0-9]{3,4}"
                                            maxLength="4"
                                            title="3 or 4 digits"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="bg-blue-50 p-4 rounded-lg flex items-center text-blue-700 animate-fade-in-down">
                                <p>You will be redirected to PayPal to complete your purchase securely.</p>
                            </div>
                        )}

                        {paymentMethod === 'cod' && (
                            <div className="bg-green-50 p-4 rounded-lg flex items-center text-green-700 animate-fade-in-down">
                                <p>Pay with cash upon delivery. Please ensure you have the exact amount ready.</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary border border-transparent rounded-full shadow-lg shadow-primary/30 py-4 px-4 text-base font-bold text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Processing...' : (paymentMethod === 'paypal' ? 'Proceed to PayPal' : `Place Order $${(cartTotal + 5).toFixed(2)}`)}
                        </button>
                    </form>
                </section>

                {/* Order Summary Sidebar */}
                <section className="hidden lg:block lg:col-span-5 bg-gray-50 rounded-2xl px-4 py-6 sm:p-6 lg:p-8 h-fit sticky top-24">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                    <dl className="space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-sm text-gray-600">Shipping</dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-bold text-gray-900">Total</dt>
                            <dd className="text-base font-bold text-primary">${(cartTotal + 5).toFixed(2)}</dd>
                        </div>
                    </dl>
                </section>
            </div>
        </div>
    );
};

export default Checkout;
