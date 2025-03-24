const express = require("express");
const { createProductStock, getProductStock, getStockByProductVaraintId, getStockByVariantIds, updateProductStock } = require("../controllers/productstockControllers");

const router = express.Router();

router.post('/',createProductStock);
router.put('/updateStock/:productvariantId',updateProductStock);
router.get('/',getProductStock);
router.get('/fetchProductStock/:productVaraintId',getStockByProductVaraintId);
router.post('/fetchstockByProductVariantId',getStockByVariantIds);


module.exports = router;