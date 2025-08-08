import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to the AI Shopping Assistant
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 text-center mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Discover products, get smart recommendations, and enjoy a seamless shopping experience with our AI-powered assistant.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mb-8"
      >
        <Link to="/ai-assistant" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
          Ask the AI Assistant
        </Link>
      </motion.div>
      <motion.div
        className="w-full max-w-4xl mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Placeholder cards, replace with real data if desired */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" alt="Wireless Headphones" className="h-32 object-cover mb-2 rounded" />
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">Wireless Headphones</div>
            <div className="text-blue-600 dark:text-blue-300 font-bold">$99.99</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308" alt="Smart Watch" className="h-32 object-cover mb-2 rounded" />
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">Smart Watch</div>
            <div className="text-blue-600 dark:text-blue-300 font-bold">$149.99</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Yoga Mat" className="h-32 object-cover mb-2 rounded" />
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">Yoga Mat</div>
            <div className="text-blue-600 dark:text-blue-300 font-bold">$29.99</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}