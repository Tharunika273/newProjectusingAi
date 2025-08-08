const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: '../.env' });

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness and notifications with this smart watch.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly yoga mat for all types of exercises.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Fitness',
    stock: 100,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for daily workouts.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c',
    category: 'Footwear',
    stock: 40,
  },
  {
    name: 'Coffee Maker',
    description: 'Brew the perfect cup with this easy-to-use coffee maker.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    category: 'Home Appliances',
    stock: 25,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and long battery life.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    category: 'Electronics',
    stock: 60,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Sample products seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();