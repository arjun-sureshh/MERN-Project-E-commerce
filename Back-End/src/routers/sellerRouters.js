const express = require("express");
const { createSeller, getSeller } = require("../controllers/sellerControllers");

const router = express.Router();

router.post('/',createSeller);
router.get('/',getSeller);


module.exports = router;