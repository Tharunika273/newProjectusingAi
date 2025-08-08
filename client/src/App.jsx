import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import AssistantPage from './pages/AssistantPage';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">AI Shop</Link>
        <div className="space-x-4">
          <Link to="/search" className="hover:text-blue-600">Search</Link>
          <Link to="/assistant" className="hover:text-blue-600">AI Assistant</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        </div>
      </div>
    </nav>
  );
}

const App = () => {
  React.useEffect(() => {
    if (!localStorage.getItem('userId')) {
      // Simple random ID for demo purposes
      localStorage.setItem('userId', Math.random().toString(36).substring(2, 10));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">© {new Date().getFullYear()} AI Shopping Assistant</footer>
    </div>
  );
};

export default App;