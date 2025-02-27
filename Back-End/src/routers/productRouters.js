const express = require('express');
const { createProduct, getProduct, updateBrandId, updateSkuidAndFullfilement } = require('../controllers/productControllers');

const router = express.Router();

router.post('/',createProduct);
router.put('/brandId/:productId',updateBrandId);
router.put('/skuidUpdate/:productId',updateSkuidAndFullfilement);
router.get('/',getProduct);

module.exports = router;
