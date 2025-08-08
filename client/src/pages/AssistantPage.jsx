import React, { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/ai-assistant', { message: input });
      const assistantMsg = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col h-[80vh]">
      <h1 className="text-2xl font-semibold mb-4 text-center">AI Shopping Assistant</h1>
      <div className="flex-1 overflow-y-auto space-y-4 bg-white p-4 rounded shadow">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-200'}`}
          >
            {msg.content}
          </motion.div>
        ))}
        {loading && <p className="text-center text-gray-500">Thinking...</p>}
      </div>
      <div className="mt-4 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask me anything about our products..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AssistantPage;