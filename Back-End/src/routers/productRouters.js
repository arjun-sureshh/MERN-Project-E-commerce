const express = require('express');
const {  getProduct, updateBrandId, updateSkuidAndFullfilement, createProduct,  getProductById, getProductBySellerID, deleteProduct } = require('../controllers/productControllers');

const router = express.Router();

router.post('/',createProduct);
router.put('/brandId/:productId',updateBrandId);
router.put('/skuidUpdate/:productId',updateSkuidAndFullfilement);
router.get('/',getProduct);
router.get('/:productId',getProductById);
router.get('/fetchallproducts/:sellerId',getProductBySellerID);
router.delete('/:id',deleteProduct)


module.exports = router;
