const Wishlist = require("../models/wishlistModels");

// Wishlish get 
const getWishlist = async (req, res) => {
    try {
        const wishlistDetails = await Wishlist.find();
        res.status(200).json(wishlistDetails);

    }catch (error) {
        res.status(500).json({ message: "Error in fetching keyFeatures ", error })
    }
}

// wishlist post

const createWishlist = async (req, res) => {
    const { varientId, userId } = req.body;

    if (varientId, userId) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newWishlist = new Order({
            varientId, userId
        });

        await newWishlist.save();
        res.status(201).json({ message: "Wishlist List added succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createWishlist,
    getWishlist
}

