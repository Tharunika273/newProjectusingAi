import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// POST /checkout { userId }
router.post('/', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const user = await User.findById(userId).populate('cart.product');
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.cart.length === 0)
      return res.status(400).json({ error: 'Cart is empty' });

    const total = user.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: user._id,
      items: user.cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total,
      status: 'completed',
    });

    // Clear cart
    user.cart = [];
    await user.save();

    res.json({ message: 'Checkout successful', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;