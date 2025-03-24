const express = require('express');
const {  getProduct, updateBrandId, updateSkuidAndFullfilement, createProduct,  getProductById, getProductBySellerID, deleteProduct, getProductByProductId, getProductToQC, updateQcStatus, getApprovedProduct, getRejectedProduct } = require('../controllers/productControllers');

const router = express.Router();

router.post('/',createProduct);
router.put('/brandId/:productId',updateBrandId);
router.put('/skuidUpdate/:productId',updateSkuidAndFullfilement);
router.put('/approved/:productId',updateQcStatus);
router.get('/',getProduct);
router.get('/fetchToQC',getProductToQC);
router.get('/ApprovedProducts',getApprovedProduct);
router.get('/RejectedProducts',getRejectedProduct);
router.get('/:productId',getProductById);
router.get('/fetchallproducts/:sellerId',getProductBySellerID);
router.get('/fetchProductData/:productId',getProductByProductId);
router.delete('/:id',deleteProduct)


module.exports = router;
