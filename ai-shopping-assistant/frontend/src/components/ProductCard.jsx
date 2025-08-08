import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await axios.post('/cart', { productId: product._id, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    } catch (err) {}
    setAdding(false);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <img src={product.image} alt={product.name} className="h-32 object-cover mb-2 rounded" />
      <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">{product.name}</div>
      <div className="text-blue-600 dark:text-blue-300 font-bold mb-2">${product.price}</div>
      <button
        onClick={handleAddToCart}
        disabled={adding || added}
        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold mt-2 transition-colors ${adding ? 'opacity-60' : 'hover:bg-blue-700'} ${added ? 'bg-green-500' : ''}`}
      >
        {added ? 'Added!' : adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </motion.div>
  );
}