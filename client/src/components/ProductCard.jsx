import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 flex-1">{product.name}</h3>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product._id)}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;