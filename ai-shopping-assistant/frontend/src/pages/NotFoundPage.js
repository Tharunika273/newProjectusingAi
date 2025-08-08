import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary-600">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-600 mb-8">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/"
                className="btn-primary w-full"
              >
                <HomeIcon className="w-5 h-5" />
                Back to Home
              </Link>
              
              <Link
                to="/search"
                className="btn-outline w-full"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;