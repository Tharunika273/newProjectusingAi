import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { productAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const HomePage = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await productAPI.getFeaturedProducts(8);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      // Toast will be shown automatically through context
    }
  };

  const categories = [
    {
      name: 'Electronics',
      icon: '📱',
      description: 'Latest gadgets and devices',
      color: 'bg-blue-500'
    },
    {
      name: 'Clothing',
      icon: '👕',
      description: 'Fashion and apparel',
      color: 'bg-purple-500'
    },
    {
      name: 'Books',
      icon: '📚',
      description: 'Knowledge and entertainment',
      color: 'bg-green-500'
    },
    {
      name: 'Home & Garden',
      icon: '🏠',
      description: 'Home improvement essentials',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="page-container py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Your AI-Powered Shopping Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-primary-100"
            >
              Discover products with intelligent recommendations, smart search, and personalized assistance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/ai-assistant"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChatBubbleLeftIcon className="w-5 h-5" />
                Ask AI Assistant
              </Link>
              <Link
                to="/search"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Browse Products
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="relative">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse product categories and find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center cursor-pointer transform transition-all duration-200 hover:shadow-lg"
                onClick={() => navigate(`/search?category=${encodeURIComponent(category.name)}`)}
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="text-gray-600">
                Handpicked products with great ratings and reviews.
              </p>
            </div>
            <Link
              to="/search"
              className="btn-outline hidden md:flex"
            >
              View All
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="card p-4">
                  <div className="loading-shimmer h-48 rounded-lg mb-4"></div>
                  <div className="loading-shimmer h-4 rounded mb-2"></div>
                  <div className="loading-shimmer h-4 rounded w-2/3 mb-2"></div>
                  <div className="loading-shimmer h-6 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product._id);
                        }}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to="/search" className="btn-outline">
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Finding Something?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Our AI assistant is here to help you discover the perfect products based on your needs and preferences.
            </p>
            <Link
              to="/ai-assistant"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2 transform hover:scale-105"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              Chat with AI Assistant
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;