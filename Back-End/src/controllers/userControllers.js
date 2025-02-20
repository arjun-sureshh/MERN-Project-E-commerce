const User = require("../models/userModels");
const bcrypt = require('bcrypt')


// user get

const getUser = async (req,res) =>{
    try {
        const userDetails = await User.find();
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching User ", error})
    }
}

// user create

const createUser = async (req, res) => {

    const { userName, userEmail, userPassword, userMobileNumber } = req.body;

    if (!userName || !userEmail || !userPassword || !userMobileNumber) {
        return res.status(400).json({ message: "Please Provide all Required Fields" })
    }
    try {
        const existingUser = await User.findOne({ userEmail })

        if (existingUser) {
            return res.status(400).json({ messgae: "User  email  is already exists" })
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const newUser = new User({
            userName, userEmail, userPassword, userMobileNumber:hashedPassword
        })
        await newUser.save();
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
    createUser,
    getUser
}