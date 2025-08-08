import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">AI Shopping Assistant</h3>
            <p className="text-gray-300 mb-4">
              Your intelligent shopping companion powered by AI. Find the perfect products with personalized recommendations and smart search capabilities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/search" className="block text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/ai-assistant" className="block text-gray-300 hover:text-white transition-colors">
                AI Assistant
              </Link>
              <Link to="/cart" className="block text-gray-300 hover:text-white transition-colors">
                Shopping Cart
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-md font-semibold mb-4">Categories</h4>
            <nav className="space-y-2">
              <Link to="/search?category=Electronics" className="block text-gray-300 hover:text-white transition-colors">
                Electronics
              </Link>
              <Link to="/search?category=Clothing" className="block text-gray-300 hover:text-white transition-colors">
                Clothing
              </Link>
              <Link to="/search?category=Books" className="block text-gray-300 hover:text-white transition-colors">
                Books
              </Link>
              <Link to="/search?category=Home & Garden" className="block text-gray-300 hover:text-white transition-colors">
                Home & Garden
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 AI Shopping Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;