require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness and notifications on the go.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    price: 149.99,
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly yoga mat for all types of exercises.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 29.99,
    category: 'Fitness',
    stock: 100,
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily workouts.',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c',
    price: 79.99,
    category: 'Footwear',
    stock: 40,
  },
  {
    name: 'Coffee Maker',
    description: 'Brew the perfect cup every time.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    price: 59.99,
    category: 'Home Appliances',
    stock: 25,
  },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Sample products seeded!');
  mongoose.connection.close();
};

seed();