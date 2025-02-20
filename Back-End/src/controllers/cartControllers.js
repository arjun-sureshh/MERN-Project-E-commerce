const MYcart = require("../models/cartModels");

// get Cart
const getCart = async (req, res) => {
    try {
        const CartDetails = await MYcart.find();
        res.status(200).json({ CartDetails });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching Cart details ", error })
    }
}

// post Cart

const createCart = async (req, res) => {
    const { cartQty, productvariantId, bookingID } = req.body;
    try {
       
        const newCart = new MYcart({
            cartQty, productvariantId, bookingID
        })
        await newCart.save();
        res.status(201).json({ message:"Product  added to cart successfully " })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createCart,
    getCart
}