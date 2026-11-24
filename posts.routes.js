const express = require('express');
const postsController = require('../controllers/posts.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, postsController.getFeed);
router.post('/', requireAuth, postsController.createPost);
router.post('/:id/react', requireAuth, postsController.toggleReaction);
router.get('/:id/comments', optionalAuth, postsController.getComments);
router.post('/:id/comments', requireAuth, postsController.addComment);

module.exports = router;
