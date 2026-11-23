const express = require('express');
const usersController = require('../controllers/users.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/search', optionalAuth, usersController.searchUsers);
router.get('/profile/:id', optionalAuth, usersController.getProfile);
router.put('/profile', requireAuth, usersController.updateProfile);
router.post('/low-data/toggle', requireAuth, usersController.toggleLowDataMode);

module.exports = router;
