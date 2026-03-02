import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalPayment = ({ amount, onSuccess, onError }) => {
  // Initial options for the PayPal Script
  const initialOptions = {
    "client-id": "test", // Replace with your PayPal client ID in production
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      onSuccess(details);
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="mt-4">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{
            layout: 'horizontal',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 40,
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalPayment; 