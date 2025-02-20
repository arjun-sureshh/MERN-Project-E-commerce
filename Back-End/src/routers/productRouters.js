const express = require('express');
const { createProduct, getProduct } = require('../controllers/productControllers');

const router = express.Router();

router.post('/',createProduct);
router.get('/',getProduct);

module.exports = router;
