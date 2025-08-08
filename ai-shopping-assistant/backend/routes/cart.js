const express = require('express');
const router = express.Router();

// POST /cart - add item to cart (dummy, no auth)
router.post('/', (req, res) => {
  // In a real app, you would update the user's cart in the DB
  res.json({ message: 'Item added to cart (dummy response)' });
});

module.exports = router;