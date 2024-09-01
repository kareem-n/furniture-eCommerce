import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'




function PaymentForm({amount}) {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleClick = async () => {
        const stripe = await stripePromise;
    
        const { error } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Product Name',
                },
                unit_amount: amount * 100, // Amount in cents
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          successUrl: 'https://your-success-url.com',
          cancelUrl: 'https://your-cancel-url.com',
        });
    
        if (error) {
          console.error("Stripe error:", error);
        }
      };
    
      return (
        <button onClick={handleClick}>
          Checkout
        </button>
      );
   
}

export default PaymentForm