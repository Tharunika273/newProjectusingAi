import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { aiAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const AiAssistantPage = () => {
  const { addToCart } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI shopping assistant. I can help you find products, answer questions about our inventory, and provide personalized recommendations. What are you looking for today?",
      timestamp: new Date(),
      recommendations: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiAPI.chat(inputMessage.trim());
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.message,
        timestamp: new Date(),
        recommendations: response.data.recommendations || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        recommendations: []
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      // Add a quick response message
      const confirmMessage = {
        id: Date.now(),
        type: 'ai',
        content: "Great choice! I've added that item to your cart. Is there anything else I can help you find?",
        timestamp: new Date(),
        recommendations: []
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const suggestedQuestions = [
    "Show me popular electronics",
    "I need a gift for someone who loves reading",
    "What are your best-rated products?",
    "I'm looking for workout gear",
    "Show me products under $50",
    "What's new in your clothing collection?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <SparklesIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900">AI Shopping Assistant</h1>
            </motion.div>
            <p className="text-gray-600">
              Ask me anything about our products and I'll help you find exactly what you need!
            </p>
          </div>

          {/* Chat Container */}
          <div className="card overflow-hidden">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4" style={{ minHeight: '400px' }}>
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <SparklesIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : ''}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>

                      {/* Product Recommendations */}
                      {message.recommendations && message.recommendations.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="text-sm font-medium text-gray-700">Recommended products:</p>
                          {message.recommendations.map((product) => (
                            <motion.div
                              key={product._id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                            >
                              <div className="flex gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=No+Image';
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-sm text-primary-600 font-semibold">
                                    {formatPrice(product.price)}
                                  </p>
                                  <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <button
                                  onClick={() => handleAddToCart(product._id)}
                                  className="flex-shrink-0 p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                                  title="Add to cart"
                                >
                                  <PlusIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me about products, categories, or get recommendations..."
                    disabled={isLoading}
                    className="w-full input-field pr-12"
                  />
                  <ChatBubbleOvalLeftEllipsisIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Get personalized product suggestions based on your preferences and needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Natural Conversation</h3>
              <p className="text-gray-600 text-sm">
                Ask questions in natural language and get helpful, conversational responses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <p className="text-gray-600 text-sm">
                Add recommended products directly to your cart with one click.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;