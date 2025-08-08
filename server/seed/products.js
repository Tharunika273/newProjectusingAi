import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-shopping';

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 30 hours battery life.',
    category: 'Electronics',
    price: 99.99,
    image: 'https://via.placeholder.com/300x300.png?text=Headphones',
    stock: 25,
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness and notifications with this sleek smartwatch.',
    category: 'Wearables',
    price: 149.99,
    image: 'https://via.placeholder.com/300x300.png?text=Smart+Watch',
    stock: 40,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with excellent cushioning.',
    category: 'Fitness',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300.png?text=Yoga+Mat',
    stock: 100,
  },
  {
    name: 'Gaming Keyboard',
    description: 'Mechanical RGB keyboard with customizable keys.',
    category: 'Computer Accessories',
    price: 59.99,
    image: 'https://via.placeholder.com/300x300.png?text=Keyboard',
    stock: 50,
  },
  {
    name: 'Coffee Maker',
    description: 'Brew the perfect cup with this programmable coffee maker.',
    category: 'Home Appliances',
    price: 79.99,
    image: 'https://via.placeholder.com/300x300.png?text=Coffee+Maker',
    stock: 30,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Product.deleteMany();
    await Product.insertMany(sampleProducts);

    console.log('Seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();