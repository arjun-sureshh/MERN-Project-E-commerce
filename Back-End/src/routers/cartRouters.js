const express = require('express');
const { createCart, getCart, deleteCart } = require('../controllers/cartControllers');

const router = express.Router();

router.post('/',createCart);
router.delete('/',deleteCart);
router.get('/:userId',getCart);

module.exports = router;
