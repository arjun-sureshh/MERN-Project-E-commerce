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

const createAddress = async (req, res) => {
    const { userId, sellerId, address, pincode, districtId, city } = req.body;
    try {
        // let existingSizeHead = await SizeHead.findOne({sizeHeadName})

        // if(existingSizeHead){
        //     return res.status(400).json({message:"This Size  is already exists"})
        // }

        // save the address
        const newAddress = new Address({
            userId, sellerId, address, pincode, districtId, city
        })
        await newAddress.save();
        res.status(201).json({ message: "New Address successfully created" })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createAddress,
    getAddress
}