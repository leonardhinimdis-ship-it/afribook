const express = require('express');
const groupsController = require('../controllers/groups.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, groupsController.listGroups);
router.get('/:id', optionalAuth, groupsController.getGroupById);
router.post('/', requireAuth, groupsController.createGroup);
router.post('/:id/join', requireAuth, groupsController.joinGroup);

module.exports = router;
