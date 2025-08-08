import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductSearch from './pages/ProductSearch';
import Cart from './pages/Cart';
import AIAssistant from './pages/AIAssistant';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
