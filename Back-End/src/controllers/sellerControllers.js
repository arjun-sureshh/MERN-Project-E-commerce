const User = require("../models/userModels");
const bcrypt = require('bcrypt')


// user get

const getSeller = async (req,res) =>{
    try {
        const sellerDetails = await User.find();
        res.status(200).json(sellerDetails)
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching User ", error})
    }
}

// user create

const createSeller = async (req, res) => {

    const { sellerName, sellerEmail, sellerPassword, sellerMobileNumber, sellerDisplayName, bankAccountNo, ifscCode, storeDiscribtion,  } = req.body;
    const {categoryId} =req.params.id;
    if (!sellerName || !sellerEmail || !sellerPassword || !sellerMobileNumber || !sellerDisplayName || !bankAccountNo || !ifscCode || !storeDiscribtion) {
        return res.status(400).json({ message: "Please Provide all Required Fields" })
    }
    try {
        const existingSeller = await Seller.findOne({ userEmail })

        if (existingSeller) {
            return res.status(400).json({ messgae: "User  email  is already exists" })
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sellerPassword, salt);

        const newSeller = new User({
            sellerName, sellerEmail, sellerPassword:hashedPassword, sellerMobileNumber, sellerDisplayName, bankAccountNo, ifscCode, storeDiscribtion, categoryId
        })
        await newSeller.save();
        res.status(201).json({ message: "User Created successfully " })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createSeller,
    getSeller
}