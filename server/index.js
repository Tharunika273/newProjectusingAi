// Import dependencies
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';
import aiAssistantRouter from './routes/aiAssistant.js';

// Load environment vars
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-shopping';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/ai-assistant', aiAssistantRouter);

// Root route
app.get('/', (req, res) => {
  res.send({ message: 'AI Shopping Assistant API is running' });
});

// Connect to DB and start server
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log('💾 Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });