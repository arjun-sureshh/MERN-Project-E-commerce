const express = require("express");
const { createSizeHead, getSizeHead } = require("../controllers/sizeheadControllers");

const router = express.Router();

router.post('/',createSizeHead);
router.get('/',getSizeHead);


module.exports = router;