const express = require('express');
const { createFeedBack, getFeedBack } = require('../controllers/feedbackControllers');

const router = express.Router();

router.post('/',createFeedBack);
router.get('/',getFeedBack);

module.exports = router;
