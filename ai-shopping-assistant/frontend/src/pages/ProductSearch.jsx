import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (q = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`/products${q ? `/search?q=${q}` : ''}`);
      setProducts(res.data);
    } catch (err) {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(query);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <form onSubmit={handleSearch} className="flex mb-8">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          placeholder="Search for products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r font-semibold hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
}