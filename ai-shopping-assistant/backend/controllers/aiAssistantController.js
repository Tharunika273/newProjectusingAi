const { Configuration, OpenAIApi } = require('openai');
const Product = require('../models/Product');

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

exports.askAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    // Check for product category or keyword in message
    let products = [];
    if (message) {
      products = await Product.find({
        $or: [
          { name: { $regex: message, $options: 'i' } },
          { category: { $regex: message, $options: 'i' } },
          { description: { $regex: message, $options: 'i' } },
        ],
      });
    }
    let aiResponse = '';
    if (products.length > 0) {
      aiResponse = `Here are some products I found for "${message}":\n` + products.map(p => `- ${p.name} ($${p.price})`).join('\n');
    } else {
      // Use OpenAI to generate a conversational response
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI shopping assistant. If the user asks about products, recommend similar items from the store.' },
          { role: 'user', content: message },
        ],
        max_tokens: 100,
      });
      aiResponse = completion.data.choices[0].message.content;
    }
    res.json({ response: aiResponse, products });
  } catch (err) {
    res.status(500).json({ error: 'AI assistant error', details: err.message });
  }
};