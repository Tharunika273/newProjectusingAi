import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 4)); // Show first 4 products
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToCart = async (productId) => {
    // For demo, we use a static userId stored in localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('No user found. (In demo)');
      return;
    }
    try {
      await api.post('/cart', { userId, productId, quantity: 1 });
      alert('Added to cart');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome to the AI Shopping Assistant
          </motion.h1>
          <p className="mb-8 text-lg">
            Discover products tailored just for you with the power of AI.
          </p>
          <Link
            to="/assistant"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Ask the AI Assistant
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;