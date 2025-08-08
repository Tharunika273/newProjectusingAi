import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ChatMessage from '../components/ChatMessage';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI shopping assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post('/ai-assistant', { message: input });
      setMessages(msgs => [
        ...msgs,
        { sender: 'ai', text: res.data.response },
      ]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col h-[70vh]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex mt-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-2 bg-blue-600 text-white rounded-r font-semibold hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </motion.button>
      </form>
    </div>
  );
}