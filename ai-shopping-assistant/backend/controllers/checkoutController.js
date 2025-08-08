const User = require('../models/User');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  try {
    let user = await User.findOne({ email: 'test@user.com' }).populate('cart.product');
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const total = user.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = new Order({
      user: user._id,
      items: user.cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      total,
    });
    await order.save();
    user.cart = [];
    await user.save();
    res.json({ message: 'Checkout successful', order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};