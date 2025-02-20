const express = require("express");
const { createSizeBody, getSizeBody } = require("../controllers/sizebodyControllers");

const router = express.Router();

router.post('/',createSizeBody);
router.get('/',getSizeBody);


module.exports = router;