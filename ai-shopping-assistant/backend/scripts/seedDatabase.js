const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  // Electronics
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Features 6.1-inch Super Retina XDR display.",
    price: 999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    stock: 50,
    tags: ["smartphone", "apple", "mobile", "phone", "ios"],
    rating: 4.8,
    featured: true
  },
  {
    name: "MacBook Air M2",
    description: "Incredibly thin and light laptop with M2 chip, 13.6-inch Liquid Retina display, and all-day battery life.",
    price: 1199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    stock: 30,
    tags: ["laptop", "apple", "macbook", "computer", "m2"],
    rating: 4.7,
    featured: true
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with 30-hour battery life and crystal-clear hands-free calling.",
    price: 399,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 75,
    tags: ["headphones", "sony", "wireless", "noise-canceling", "audio"],
    rating: 4.6,
    featured: false
  },
  {
    name: "Samsung 4K Smart TV 55\"",
    description: "Crystal UHD 4K Smart TV with HDR, built-in streaming apps, and voice control. Perfect for any living room.",
    price: 799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    stock: 25,
    tags: ["tv", "samsung", "4k", "smart", "television"],
    rating: 4.5,
    featured: false
  },

  // Clothing
  {
    name: "Premium Cotton T-Shirt",
    description: "Soft, comfortable 100% organic cotton t-shirt. Perfect for everyday wear with a classic fit.",
    price: 29,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 100,
    tags: ["t-shirt", "cotton", "casual", "organic", "unisex"],
    rating: 4.3,
    featured: false
  },
  {
    name: "Designer Jeans",
    description: "Premium denim jeans with perfect fit and durable construction. Available in multiple washes and sizes.",
    price: 89,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    stock: 60,
    tags: ["jeans", "denim", "pants", "fashion", "designer"],
    rating: 4.4,
    featured: true
  },
  {
    name: "Wool Winter Coat",
    description: "Elegant wool blend coat for cold weather. Water-resistant with thermal lining for maximum warmth.",
    price: 199,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    stock: 40,
    tags: ["coat", "wool", "winter", "warm", "outerwear"],
    rating: 4.6,
    featured: false
  },

  // Books
  {
    name: "The Art of Programming",
    description: "Comprehensive guide to modern programming techniques and best practices. Perfect for beginners and experts alike.",
    price: 45,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 80,
    tags: ["programming", "coding", "computer science", "education", "technology"],
    rating: 4.7,
    featured: false
  },
  {
    name: "Mindfulness and Meditation",
    description: "A practical guide to finding peace and clarity in everyday life through mindfulness practices.",
    price: 19,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 90,
    tags: ["mindfulness", "meditation", "self-help", "wellness", "spirituality"],
    rating: 4.5,
    featured: true
  },

  // Home & Garden
  {
    name: "Smart Home Security Camera",
    description: "Wireless security camera with 1080p HD video, night vision, and smartphone alerts. Easy installation.",
    price: 129,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    stock: 45,
    tags: ["security", "camera", "smart home", "surveillance", "wireless"],
    rating: 4.4,
    featured: false
  },
  {
    name: "Organic Garden Starter Kit",
    description: "Complete kit for starting your own organic garden. Includes seeds, soil, pots, and detailed instructions.",
    price: 39,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    stock: 70,
    tags: ["gardening", "organic", "plants", "seeds", "hobby"],
    rating: 4.2,
    featured: false
  },

  // Sports
  {
    name: "Professional Yoga Mat",
    description: "Non-slip yoga mat with superior grip and cushioning. Perfect for all types of yoga and fitness exercises.",
    price: 49,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    stock: 85,
    tags: ["yoga", "fitness", "exercise", "mat", "wellness"],
    rating: 4.6,
    featured: true
  },
  {
    name: "Wireless Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Track all your activities.",
    price: 199,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    stock: 55,
    tags: ["fitness", "tracker", "health", "gps", "smartwatch"],
    rating: 4.5,
    featured: false
  },

  // Beauty
  {
    name: "Natural Skincare Set",
    description: "Complete skincare routine with natural ingredients. Includes cleanser, toner, serum, and moisturizer.",
    price: 79,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    stock: 65,
    tags: ["skincare", "natural", "beauty", "cosmetics", "organic"],
    rating: 4.7,
    featured: true
  },

  // Toys
  {
    name: "Educational Building Blocks",
    description: "Colorful building blocks that promote creativity and learning. Safe for children 3+ years old.",
    price: 25,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    stock: 120,
    tags: ["toys", "educational", "kids", "building", "creative"],
    rating: 4.4,
    featured: false
  },

  // Food
  {
    name: "Organic Coffee Beans",
    description: "Premium single-origin coffee beans, roasted to perfection. Rich, smooth flavor with notes of chocolate and caramel.",
    price: 18,
    category: "Food",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    stock: 150,
    tags: ["coffee", "organic", "beans", "beverage", "premium"],
    rating: 4.8,
    featured: false
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-shopping-assistant';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts };