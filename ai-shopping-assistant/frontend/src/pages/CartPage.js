import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ShoppingBagIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const CartPage = () => {
  const { cart, cartTotal, updateCartItem, removeFromCart, checkout, loading } = useApp();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCheckoutLoading(true);
    
    try {
      const result = await checkout(shippingAddress, 'credit_card');
      if (result.success) {
        // Show success message and redirect
        alert(`Order placed successfully! Order #${result.data.orderNumber}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto">
              <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <div className="space-y-4">
                <Link to="/search" className="btn-primary w-full">
                  Browse Products
                </Link>
                <Link to="/ai-assistant" className="btn-outline w-full">
                  Ask AI for Recommendations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-6">
                  Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=No+Image';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-lg font-bold text-primary-600">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:flex-col sm:justify-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="sm:text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                    </span>
                    <span className="font-medium">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {formatPrice(cartTotal * 0.08)}
                    </span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {formatPrice(cartTotal + (cartTotal * 0.08))}
                    </span>
                  </div>
                </div>

                {!showCheckout ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="btn-primary w-full"
                    >
                      <CreditCardIcon className="w-5 h-5" />
                      Proceed to Checkout
                    </button>
                    <Link to="/search" className="btn-outline w-full">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  /* Checkout Form */
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <h3 className="font-semibold mb-4">Shipping Address</h3>
                    
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={shippingAddress.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      className="input-field"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={shippingAddress.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        className="input-field"
                        required
                      />
                      <select
                        value={shippingAddress.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        className="input-field"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="pt-4 space-y-2">
                      <button
                        type="submit"
                        disabled={checkoutLoading}
                        className="btn-primary w-full"
                      >
                        {checkoutLoading ? 'Processing...' : 'Place Order'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="btn-secondary w-full"
                      >
                        Back to Cart
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;