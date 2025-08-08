import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { getSessionId } from '../utils/helpers';

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CATEGORIES: 'SET_CATEGORIES',
};

// Initial state
const initialState = {
  // User session
  sessionId: getSessionId(),
  
  // Cart state
  cart: [],
  cartTotal: 0,
  cartLoading: false,
  
  // Search state
  searchQuery: '',
  
  // Categories
  categories: [],
  
  // Global loading and error states
  loading: false,
  error: null,
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
      
    case ACTIONS.SET_CART:
      return { 
        ...state, 
        cart: action.payload.cart,
        cartTotal: action.payload.total,
        cartLoading: false 
      };
      
    case ACTIONS.ADD_TO_CART:
      return { 
        ...state, 
        cart: action.payload.cart,
        cartTotal: action.payload.total || calculateTotal(action.payload.cart)
      };
      
    case ACTIONS.UPDATE_CART_ITEM:
      return { 
        ...state, 
        cart: action.payload.cart,
        cartTotal: action.payload.total || calculateTotal(action.payload.cart)
      };
      
    case ACTIONS.REMOVE_FROM_CART:
      return { 
        ...state, 
        cart: action.payload.cart,
        cartTotal: action.payload.total || calculateTotal(action.payload.cart)
      };
      
    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [], cartTotal: 0 };
      
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
      
    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload };
      
    default:
      return state;
  }
};

// Helper function to calculate cart total
const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart on component mount
  useEffect(() => {
    loadCart();
  }, []);

  // Actions
  const loadCart = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.getCart(state.sessionId);
      dispatch({ 
        type: ACTIONS.SET_CART, 
        payload: response.data 
      });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to load cart' 
      });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addToCart(state.sessionId, productId, quantity);
      dispatch({ 
        type: ACTIONS.ADD_TO_CART, 
        payload: { cart: response.data.cart, total: calculateTotal(response.data.cart) }
      });
      return { success: true, message: 'Item added to cart!' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add item to cart';
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await cartAPI.updateCartItem(state.sessionId, productId, quantity);
      dispatch({ 
        type: ACTIONS.UPDATE_CART_ITEM, 
        payload: response.data 
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update cart item';
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await cartAPI.removeFromCart(state.sessionId, productId);
      dispatch({ 
        type: ACTIONS.REMOVE_FROM_CART, 
        payload: response.data 
      });
      return { success: true, message: 'Item removed from cart' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to remove item from cart';
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const checkout = async (shippingAddress, paymentMethod) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.checkout(state.sessionId, shippingAddress, paymentMethod);
      dispatch({ type: ACTIONS.CLEAR_CART });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Checkout failed';
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const setCategories = (categories) => {
    dispatch({ type: ACTIONS.SET_CATEGORIES, payload: categories });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });
  };

  const value = {
    // State
    ...state,
    
    // Actions
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    checkout,
    setSearchQuery,
    setCategories,
    clearError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;