const express = require('express');
const { createProductVariant, getProductVariant, updateProductVariant, getVaraintByProductID,  deleteProductVaraint } = require('../controllers/productvariantControllers');

const router = express.Router();

router.post('/',createProductVariant);
router.put('/updateVaraint/:productVaraintId',updateProductVariant);
router.get('/',getProductVariant);
router.get('/fetchallproducts/:sellerId',getVaraintByProductID)
router.delete('/:id',deleteProductVaraint)

module.exports = router;
