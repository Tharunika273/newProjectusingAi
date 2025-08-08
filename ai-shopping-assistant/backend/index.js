const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const aiAssistantRoutes = require('./routes/aiAssistant');

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/ai-assistant', aiAssistantRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('AI-Based Shopping Assistant API');
});

// TODO: Add product, cart, checkout, and AI assistant routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));