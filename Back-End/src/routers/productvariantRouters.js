const express = require('express');
const { createProductVariant, getProductVariant } = require('../controllers/productvariantControllers');

const router = express.Router();

router.post('/',createProductVariant);
router.get('/',getProductVariant);

module.exports = router;
