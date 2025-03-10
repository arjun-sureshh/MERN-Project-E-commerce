const express = require("express");
const { createAddress, getAddress, sellerAddress } = require("../controllers/addressControllers");

const router = express.Router();

router.post('/seller',sellerAddress);
router.get('/',getAddress);


module.exports = router;