const express = require('express');
const { createBrand, getBrand, getBrandById, deleteBrand, updateBrand, searchBrand } = require('../controllers/brandControllers');

const router = express.Router();

router.post('/',createBrand);
router.get('/',getBrand);
router.get('/:id', getBrandById);
router.get('/search/:searchData', searchBrand);
router.delete('/:id', deleteBrand);
router.put('/:id', updateBrand);


module.exports = router;
