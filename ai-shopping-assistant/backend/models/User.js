const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }
  }],
  preferences: {
    categories: [{
      type: String
    }],
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 1000 }
    }
  },
  sessionId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);