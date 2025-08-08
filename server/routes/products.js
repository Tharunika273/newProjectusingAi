import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /products - fetch all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /products/search?q=keyword
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  try {
    // Case-insensitive regex search
    const regex = new RegExp(q, 'i');
    const products = await Product.find({
      $or: [{ name: regex }, { category: regex }, { description: regex }],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;