const express = require("express");
const { createSeller, getSeller, updateNametoSeller, getSellerById, updateBankDetailstoSeller, sendOTP, verifyOTP } = require("../controllers/sellerControllers");

const router = express.Router();

router.post('/',createSeller);
router.get('/',getSeller);
router.get('/:sellerId',getSellerById);
router.put('/updateName/:sellerId',updateNametoSeller);
router.put('/bankDetails/:sellerId',updateBankDetailstoSeller);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);



module.exports = router;