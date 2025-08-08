import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your shopping assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Let me find some products for you!' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">AI Assistant</h2>
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.sender === 'ai' ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'ai' ? 'bg-blue-100 text-blue-900' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSend} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
            Send
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;