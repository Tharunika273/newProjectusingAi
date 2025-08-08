const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID and Product ID are required' });
    }

    // Find or create user by session
    let user = await User.findOne({ sessionId });
    if (!user) {
      user = new User({
        name: `Guest_${sessionId.slice(-8)}`,
        email: `guest_${sessionId.slice(-8)}@temp.com`,
        sessionId,
        cart: []
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Check if item already in cart
    const existingItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ error: 'Cannot add more items than available stock' });
      }
      user.cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      user.cart.push({
        product: productId,
        quantity: parseInt(quantity)
      });
    }

    await user.save();

    // Populate cart with product details
    await user.populate('cart.product');

    res.json({
      message: 'Item added to cart successfully',
      cart: user.cart
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get cart contents
const getCart = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const user = await User.findOne({ sessionId }).populate('cart.product');
    
    if (!user) {
      return res.json({ cart: [], total: 0 });
    }

    // Calculate total
    const total = user.cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      cart: user.cart,
      total: parseFloat(total.toFixed(2))
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    if (!sessionId || !productId || quantity < 0) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const user = await User.findOne({ sessionId });
    if (!user) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity === 0) {
      // Remove item from cart
      user.cart.splice(cartItemIndex, 1);
    } else {
      // Update quantity
      const product = await Product.findById(productId);
      if (quantity > product.stock) {
        return res.status(400).json({ error: 'Quantity exceeds available stock' });
      }
      user.cart[cartItemIndex].quantity = quantity;
    }

    await user.save();
    await user.populate('cart.product');

    // Calculate total
    const total = user.cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      message: 'Cart updated successfully',
      cart: user.cart,
      total: parseFloat(total.toFixed(2))
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { sessionId, productId } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID and Product ID are required' });
    }

    const user = await User.findOne({ sessionId });
    if (!user) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();
    await user.populate('cart.product');

    // Calculate total
    const total = user.cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      message: 'Item removed from cart successfully',
      cart: user.cart,
      total: parseFloat(total.toFixed(2))
    });

  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

// Checkout process
const checkout = async (req, res) => {
  try {
    const { sessionId, shippingAddress, paymentMethod = 'credit_card' } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const user = await User.findOne({ sessionId }).populate('cart.product');
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock availability for all items
    for (let item of user.cart) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${item.product.name}` 
        });
      }
    }

    // Calculate total amount
    const totalAmount = user.cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      user: user._id,
      items: user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });

    await order.save();

    // Update product stock
    for (let item of user.cart) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    user.cart = [];
    await user.save();

    res.json({
      message: 'Order placed successfully',
      orderId: order._id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount
    });

  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  checkout
};