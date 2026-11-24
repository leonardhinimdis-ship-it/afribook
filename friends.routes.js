const express = require('express');
const friendsController = require('../controllers/friends.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);
router.get('/', friendsController.listFriends);
router.get('/requests', friendsController.listPendingRequests);
router.post('/request/:id', friendsController.sendRequest);
router.post('/accept/:id', friendsController.acceptRequest);
router.post('/decline/:id', friendsController.declineRequest);

module.exports = router;
