const OpenAI = require('openai');
const Product = require('../models/Product');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiAssistant = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get products from database for context
    const products = await Product.find({}).limit(50);
    const productContext = products.map(p => ({
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description.substring(0, 100),
      tags: p.tags
    }));

    // Create a system prompt for the AI assistant
    const systemPrompt = `You are a helpful shopping assistant for an e-commerce store. You have access to the following products:

${JSON.stringify(productContext, null, 2)}

Your role is to:
1. Help customers find products based on their needs
2. Provide product recommendations
3. Answer questions about products, categories, and shopping
4. Be friendly, helpful, and conversational
5. When recommending products, mention specific product names, prices, and why they're good choices
6. If asked about products not in the database, suggest similar alternatives from available products

Always be helpful and try to guide customers toward making good purchasing decisions based on their needs and budget.`;

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Extract product recommendations from the response
    const recommendedProducts = [];
    
    // Simple product matching based on product names mentioned in response
    products.forEach(product => {
      if (aiResponse.toLowerCase().includes(product.name.toLowerCase()) || 
          product.tags.some(tag => aiResponse.toLowerCase().includes(tag.toLowerCase()))) {
        recommendedProducts.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        });
      }
    });

    // If no specific products mentioned, suggest featured products or products from mentioned categories
    if (recommendedProducts.length === 0) {
      const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Food'];
      const mentionedCategory = categories.find(cat => 
        message.toLowerCase().includes(cat.toLowerCase()) || 
        aiResponse.toLowerCase().includes(cat.toLowerCase())
      );

      if (mentionedCategory) {
        const categoryProducts = await Product.find({ category: mentionedCategory }).limit(3);
        categoryProducts.forEach(product => {
          recommendedProducts.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          });
        });
      } else {
        // Default to featured products
        const featuredProducts = await Product.find({ featured: true }).limit(3);
        featuredProducts.forEach(product => {
          recommendedProducts.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          });
        });
      }
    }

    res.json({
      message: aiResponse,
      recommendations: recommendedProducts.slice(0, 4), // Limit to 4 recommendations
      timestamp: new Date()
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponse = "I'm here to help you find great products! You can ask me about electronics, clothing, books, home goods, and more. What are you looking for today?";
    
    // Get some featured products as fallback recommendations
    const featuredProducts = await Product.find({ featured: true }).limit(4);
    const fallbackRecommendations = featuredProducts.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    }));

    res.json({
      message: fallbackResponse,
      recommendations: fallbackRecommendations,
      timestamp: new Date(),
      fallback: true
    });
  }
};

module.exports = {
  aiAssistant
};