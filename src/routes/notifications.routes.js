const express = require('express');
const notificationsController = require('../controllers/notifications.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);
router.get('/', notificationsController.listNotifications);
router.put('/read-all', notificationsController.markAllAsRead);

module.exports = router;
