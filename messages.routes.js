const express = require('express');
const messagesController = require('../controllers/messages.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);
router.get('/conversations', messagesController.listConversations);
router.get('/:contactId', messagesController.getConversation);
router.post('/:contactId', messagesController.sendMessage);

module.exports = router;
