const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const q = req.query.q || '';
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};