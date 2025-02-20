const Product = require("../models/productModels");



// product get 
const getProduct = async (req, res) => {
    try {
        const productDetails = await Product.find();
        res.status(200).json(productDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching product ", error })
    }
}

// admin post
const createProduct = async (req, res) => {
    const { sellerId, categoryId, brandId , skuId ,ListingStatus ,fulfilmentBy} = req.body;

    if (!sellerId || !categoryId || !brandId || !skuId || !ListingStatus ||  !fulfilmentBy ) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newProduct = new Admin({
            sellerId, categoryId, brandId , skuId ,ListingStatus ,fulfilmentBy
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createProduct,
    getProduct
}

