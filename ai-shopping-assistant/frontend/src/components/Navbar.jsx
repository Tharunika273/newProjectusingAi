import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HomeIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/search', label: 'Search', icon: MagnifyingGlassIcon },
  { to: '/cart', label: 'Cart', icon: ShoppingCartIcon },
  { to: '/ai-assistant', label: 'AI Assistant', icon: ChatBubbleLeftRightIcon },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400">AI Shopping Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}