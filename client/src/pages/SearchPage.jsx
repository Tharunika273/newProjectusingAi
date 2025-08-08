import React, { useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) return;
    try {
      const { data } = await api.get('/products/search', { params: { q: query } });
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Search Products</h1>
      <div className="flex mb-8 gap-2 justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for anything..."
          className="w-full max-w-md border rounded px-4 py-2"
        />
        <button
          onClick={search}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results</p>
      )}
    </div>
  );
};

export default SearchPage;