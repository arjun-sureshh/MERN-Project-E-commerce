const express = require("express");
const { createUser, getUser, getUserByUserId, updateUserDetails } = require("../controllers/userControllers");

const router = express.Router();

router.post('/',createUser);
router.put('/:userId',updateUserDetails);
router.get('/',getUser);
router.get('/FetchDataByUserId/:userId',getUserByUserId);


module.exports = router;