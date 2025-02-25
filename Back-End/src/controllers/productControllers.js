const { default: mongoose } = require("mongoose");
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

// Product cerated in category add section post
const createProduct = async (req, res) => {
    const { sellerId, categoryId } = req.body;

    if (!sellerId || !categoryId ) {
        return res.status(400).json({ message: "Please provide the category  fields" })
    }

    try {
       
        const newProduct = new Product({
            sellerId, categoryId, ListingStatus:"Draft"
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "caetrgory added to product listing succeccfully",
            productId: savedProduct._id
        });

    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
};

// update Brand Id in to  product 

const updateBrandId = async (req, res) => {
    const {productId} = req.params;
    const { brandId } = req.body;
    

    if ( !brandId || !productId ) {
        return res.status(400).json({ message: "Please provide Brand Id" });
    }

    try {
        const updatedBrandId = await Product.findByIdAndUpdate(
            productId, 
            { brandId: brandId }, 
            { new: true, runValidators: true }
        );

        if (!updatedBrandId) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Brand  updated to product successfully", product: updatedBrandId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = {
    createProduct,
    getProduct,
    updateBrandId
}

