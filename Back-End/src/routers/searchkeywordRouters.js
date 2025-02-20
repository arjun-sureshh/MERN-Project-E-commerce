const express = require('express');
const { createSearchKeyword, getSearchKeyword } = require('../controllers/searchkeywordControllers');


const router = express.Router();

router.post('/',createSearchKeyword);
router.get('/',getSearchKeyword);

module.exports = router;
