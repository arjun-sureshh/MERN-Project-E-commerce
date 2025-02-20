const express = require("express");
const { createAddress, getAddress } = require("../controllers/addressControllers");

const router = express.Router();

router.post('/',createAddress);
router.get('/',getAddress);


module.exports = router;