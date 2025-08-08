import React from 'react';
import { motion } from 'framer-motion';

const ProductSearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Placeholder product cards */}
        {[1,2,3,4,5,6].map(i => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 w-2/3 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">Add to Cart</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearchPage;