import React, { useState } from 'react';
import PaypalPayment from './PaypalPayment';
import StripePayment from './StripePayment';

const PaymentMethodSelector = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe'); // Default to stripe
  
  const handlePaymentSuccess = (details) => {
    onPaymentSuccess(details);
  };
  
  const handlePaymentError = (error) => {
    onPaymentError(error);
  };
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Payment Method</h3>
      
      <div className="space-y-2">
        {/* Stripe option */}
        <div className="flex items-center">
          <input
            type="radio"
            id="stripe"
            name="paymentMethod"
            value="stripe"
            checked={selectedMethod === 'stripe'}
            onChange={() => setSelectedMethod('stripe')}
            className="mr-2"
          />
          <label htmlFor="stripe" className="flex items-center cursor-pointer">
            <span className="mr-2">Credit Card</span>
            <div className="flex space-x-1">
              <div className="w-10 h-6 bg-indigo-100 rounded flex items-center justify-center text-indigo-800 text-xs">Visa</div>
              <div className="w-10 h-6 bg-red-100 rounded flex items-center justify-center text-red-800 text-xs">MC</div>
            </div>
          </label>
        </div>
        
        {/* PayPal option */}
        <div className="flex items-center">
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={() => setSelectedMethod('paypal')}
            className="mr-2"
          />
          <label htmlFor="paypal" className="flex items-center cursor-pointer">
            <span className="mr-2">PayPal</span>
            <div className="w-14 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 text-xs">PayPal</div>
          </label>
        </div>
      </div>
      
      {/* Render selected payment method */}
      <div className="mt-4">
        {selectedMethod === 'stripe' ? (
          <StripePayment 
            amount={amount} 
            onSuccess={handlePaymentSuccess} 
            onError={handlePaymentError} 
          />
        ) : (
          <PaypalPayment 
            amount={amount} 
            onSuccess={handlePaymentSuccess} 
            onError={handlePaymentError} 
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 