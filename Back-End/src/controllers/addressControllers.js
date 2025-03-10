const Address = require("../models/addressModels");

// get address
const getAddress = async (req, res) => {
    try {
        const AddressDetails = await Address.find();
        res.status(200).json({ sizeHeadDetails });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching Address ", error })
    }
}

// post Address

const sellerAddress = async (req, res) => {
    const {sellerId, address, pincode } = req.body;
    
    try {
        if(!sellerId || !address || !pincode){
            return res.status(400).json({ message: "Please provide all fields" });
        }
        const newAddress = new Address({
             sellerId, address, pincode
        })
        await newAddress.save();
        res.status(201).json({ message: "New Address successfully created" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    sellerAddress,
    getAddress
}