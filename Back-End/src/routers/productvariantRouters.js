const express = require('express');
const { createProductVariant, getProductVariant, updateProductVariant, getVaraintBySellerID,  deleteProductVaraint, getVaraintByProductID, getVaraintByID, getVariantToQC } = require('../controllers/productvariantControllers');

const router = express.Router();

router.post('/',createProductVariant);
router.put('/updateVaraint/:productVaraintId',updateProductVariant);
router.get('/',getProductVariant);
router.post('/fetchVariantByProductId',getVariantToQC);
router.get('/fetchallproducts/:sellerId',getVaraintBySellerID);
router.get('/fetchProductVaraintData/:productVaraintId',getVaraintByID);
router.get('/fetchVaraintByProductId/:productId',getVaraintByProductID);
router.delete('/:id',deleteProductVaraint);

module.exports = router;
