import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import ProductSearchPage from './pages/ProductSearchPage';
import CartPage from './pages/CartPage';
import AiAssistantPage from './pages/AiAssistantPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<ProductSearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/ai-assistant" element={<AiAssistantPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <Footer />
            <Toast />
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
