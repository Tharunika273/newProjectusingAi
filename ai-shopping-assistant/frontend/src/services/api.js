import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add session ID to requests
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API methods
export const productAPI = {
  // Get all products with optional filters
  getProducts: (params = {}) => 
    api.get('/products', { params }),
  
  // Search products
  searchProducts: (query, filters = {}) => 
    api.get('/products/search', { params: { q: query, ...filters } }),
  
  // Get featured products
  getFeaturedProducts: (limit = 8) => 
    api.get('/products/featured', { params: { limit } }),
  
  // Get single product
  getProduct: (id) => 
    api.get(`/products/${id}`),
  
  // Get categories
  getCategories: () => 
    api.get('/products/categories'),
};

// Cart API methods
export const cartAPI = {
  // Get cart contents
  getCart: (sessionId) => 
    api.get('/cart', { params: { sessionId } }),
  
  // Add item to cart
  addToCart: (sessionId, productId, quantity = 1) => 
    api.post('/cart', { sessionId, productId, quantity }),
  
  // Update cart item quantity
  updateCartItem: (sessionId, productId, quantity) => 
    api.put('/cart', { sessionId, productId, quantity }),
  
  // Remove item from cart
  removeFromCart: (sessionId, productId) => 
    api.delete('/cart', { data: { sessionId, productId } }),
  
  // Checkout
  checkout: (sessionId, shippingAddress, paymentMethod = 'credit_card') => 
    api.post('/cart/checkout', { sessionId, shippingAddress, paymentMethod }),
};

// AI Assistant API methods
export const aiAPI = {
  // Chat with AI assistant
  chat: (message, userId = null) => 
    api.post('/ai-assistant', { message, userId }),
};

export default api;