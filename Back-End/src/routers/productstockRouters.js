const express = require("express");
const { createProductStock, getProductStock } = require("../controllers/productstockControllers");

const router = express.Router();

router.post('/',createProductStock);
router.get('/',getProductStock);


module.exports = router;