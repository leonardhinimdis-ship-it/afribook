const express = require('express');
const marketplaceController = require('../controllers/marketplace.controller');
const { optionalAuth, requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, marketplaceController.listProducts);
router.post('/', requireAuth, marketplaceController.createProduct);

module.exports = router;
