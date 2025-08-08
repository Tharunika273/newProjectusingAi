import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductSearchPage from './pages/ProductSearchPage';
import CartPage from './pages/CartPage';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">AI Shop</Link>
        <div className="flex gap-6">
          <Link to="/search" className="text-blue-600 hover:underline">Search</Link>
          <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
          <Link to="/ai-assistant" className="text-blue-600 hover:underline">AI Assistant</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<ProductSearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
