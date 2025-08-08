import express from 'express';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to query DB for category or keyword
async function findProductsByKeyword(keyword) {
  const regex = new RegExp(keyword, 'i');
  return Product.find({ $or: [{ name: regex }, { category: regex }, { description: regex }] }).limit(5);
}

// POST /ai-assistant { message }
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // Basic keyword extraction: we'll check for keywords from the message by splitting
    const words = message.split(/\s+/);

    // Attempt to find matching products for each word (limit to first match)
    let matchedProducts = [];
    for (const w of words) {
      const products = await findProductsByKeyword(w);
      if (products.length) {
        matchedProducts = products;
        break;
      }
    }

    let productText = '';
    if (matchedProducts.length) {
      productText = '\n\nHere are some product suggestions you might like:\n' + matchedProducts
        .map((p) => `• ${p.name} - $${p.price}`)
        .join('\n');
    }

    // Craft prompt
    const prompt = `You are an AI shopping assistant. Help the user with their query in a friendly manner.${productText}\n\nUser: ${message}\nAssistant:`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI shopping assistant for an online store. Reply conversationally and concisely.',
        },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply, suggestions: matchedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI Assistant failed' });
  }
});

export default router;