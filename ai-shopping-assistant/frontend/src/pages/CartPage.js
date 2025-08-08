import React from 'react';
import { motion } from 'framer-motion';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="w-full max-w-2xl mb-8">
        {/* Placeholder cart items */}
        {[1,2].map(i => (
          <motion.div key={i} whileHover={{ scale: 1.01 }} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4" />
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="font-semibold text-lg">$99.99</div>
          </motion.div>
        ))}
      </div>
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-2xl font-bold">$199.98</span>
      </div>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg transition-all hover:bg-green-700">
        Checkout
      </motion.button>
    </div>
  );
};

export default CartPage;