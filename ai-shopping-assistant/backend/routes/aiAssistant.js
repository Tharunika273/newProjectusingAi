const express = require('express');
const router = express.Router();
const { askAssistant } = require('../controllers/aiAssistantController');

router.post('/', askAssistant);

module.exports = router;