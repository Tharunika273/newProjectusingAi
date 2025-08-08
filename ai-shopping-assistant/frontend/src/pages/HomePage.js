import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center p-4">
      <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold text-blue-900 mb-4 text-center">
        Welcome to the AI-Based Shopping Assistant
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-lg md:text-2xl text-blue-700 mb-8 text-center max-w-2xl">
        Discover products, get smart recommendations, and enjoy a seamless shopping experience with our AI-powered assistant.
      </motion.p>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg transition-all hover:bg-blue-700 mb-8">
        Ask the AI Assistant
      </motion.button>
      {/* Featured products will go here */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Placeholder cards */}
        {[1,2,3].map(i => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mb-4" />
            <div className="h-4 w-2/3 bg-blue-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-blue-100 rounded" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;