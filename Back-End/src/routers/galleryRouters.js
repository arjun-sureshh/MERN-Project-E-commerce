const express = require("express");
const { createGallery, getGallery } = require("../controllers/galleryControllers");

const router = express.Router();

router.post('/',createGallery);
router.get('/',getGallery);


module.exports = router;