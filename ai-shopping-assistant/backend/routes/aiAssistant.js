const express = require('express');
const Product = require('../models/Product');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /ai-assistant
router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    // Search for product category in the message
    let products = [];
    let category = null;
    const categories = await Product.distinct('category');
    for (const cat of categories) {
      if (message.toLowerCase().includes(cat.toLowerCase())) {
        category = cat;
        break;
      }
    }
    if (category) {
      products = await Product.find({ category });
    } else {
      // Try to find similar products by name/description
      products = await Product.find({
        $or: [
          { name: { $regex: message, $options: 'i' } },
          { description: { $regex: message, $options: 'i' } },
        ],
      });
    }
    // Prepare product info for AI
    const productList = products.map(p => `${p.name} ($${p.price})`).join(', ');
    // Compose prompt
    const prompt = `You are a helpful AI shopping assistant.\nUser: ${message}\nAssistant: ` +
      (products.length > 0
        ? `Here are some products you might like: ${productList}`
        : 'Sorry, I could not find exact matches, but I can recommend similar items or help with other questions.');
    // Call OpenAI API
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    res.json({
      response: completion.data.choices[0].text.trim(),
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI assistant error' });
  }
});

module.exports = router;