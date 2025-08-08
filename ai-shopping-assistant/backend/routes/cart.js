const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  checkout
} = require('../controllers/cartController');

// GET /api/cart - Get cart contents
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PUT /api/cart - Update cart item quantity
router.put('/', updateCartItem);

// DELETE /api/cart - Remove item from cart
router.delete('/', removeFromCart);

// POST /api/cart/checkout - Process checkout
router.post('/checkout', checkout);

module.exports = router;