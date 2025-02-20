const express = require("express");
const { createWishlist, getWishlist } = require("../controllers/wishlistControllers");

const router = express.Router();

router.post('/',createWishlist);
router.get('/',getWishlist);


module.exports = router;