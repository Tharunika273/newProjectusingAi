import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CartItem from '../components/CartItem';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    try {
      // For demo, fetch test user cart
      const res = await axios.post('/cart', { productId: '', quantity: 0 });
      setCart(res.data.filter(item => item.product));
    } catch (err) {
      setCart([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await axios.post('/checkout');
      setCheckoutMsg('Checkout successful!');
      setCart([]);
    } catch (err) {
      setCheckoutMsg('Checkout failed.');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Shopping Cart</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <CartItem key={item.product?._id} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Total: <span className="text-blue-600 dark:text-blue-300">${total.toFixed(2)}</span></div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckout}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}
      {checkoutMsg && <div className="mt-4 text-center text-green-600 font-semibold">{checkoutMsg}</div>}
    </div>
  );
}