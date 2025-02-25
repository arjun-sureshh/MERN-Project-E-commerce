const express = require('express');
const { createProduct, getProduct, updateBrandId } = require('../controllers/productControllers');

const router = express.Router();

router.post('/',createProduct);
router.put('/brandId/:productId',updateBrandId);
router.get('/',getProduct);

module.exports = router;
