const express = require("express");
const { createUser, getUser } = require("../controllers/userControllers");

const router = express.Router();

router.post('/',createUser);
router.get('/',getUser);


module.exports = router;