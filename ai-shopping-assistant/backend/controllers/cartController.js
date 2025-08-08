const User = require('../models/User');
const Product = require('../models/Product');

// For demo: add to cart for a single test user
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let user = await User.findOne({ email: 'test@user.com' });
    if (!user) {
      user = new User({ name: 'Test User', email: 'test@user.com', password: 'test123', cart: [] });
    }
    const existingItem = user.cart.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};