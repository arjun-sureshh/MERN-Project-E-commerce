const express = require("express");
const { createKeyFeatures, getKeyFeatures } = require("../controllers/keyfeatureControllers");

const router = express.Router();

router.post('/',createKeyFeatures);
router.get('/',getKeyFeatures);


module.exports = router;