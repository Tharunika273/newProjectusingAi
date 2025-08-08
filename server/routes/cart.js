import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// POST /cart { userId, productId, quantity }
router.post('/', async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  if (!userId || !productId)
    return res.status(400).json({ error: 'Missing userId or productId' });

  try {
    const user = await User.findById(userId) || await User.create({ _id: userId, name: 'Demo User', email: `${userId}@example.com` });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check if product already in cart
    const existingItem = user.cart.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    res.json({ message: 'Added to cart', cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// GET /cart/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('cart.product');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

export default router;