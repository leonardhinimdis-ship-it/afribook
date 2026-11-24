const express = require('express');
const storiesController = require('../controllers/stories.controller');
const { optionalAuth, requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, storiesController.listStories);
router.post('/', requireAuth, storiesController.createStory);

module.exports = router;
