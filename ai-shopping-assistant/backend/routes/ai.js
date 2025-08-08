const express = require('express');
const router = express.Router();
const { aiAssistant } = require('../controllers/aiController');

// POST /api/ai-assistant - Chat with AI assistant
router.post('/', aiAssistant);

module.exports = router;