const ProductVariant = require("../models/productVariantModels");


// product get 
const getProductVariant = async (req, res) => {
    try {
        const productvariantDetails = await ProductVariant.find();
        res.status(200).json(productvariantDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching product ", error })
    }
}

// admin post
const createProductVariant = async (req, res) => {
    const { productId,mrp, sellingPrice, minimumOrderQty , shippingProvider ,
        Length ,breadth,weight,hsnCode,taxCode,countryOfOrgin,
        manufactureDetails,packerDetails,productDiscription,
        productTitle,intheBox,warrantyPeriod,warantyType } = req.body;
    try {
       
        const newProductVareint = new Admin({
            productId, mrp, sellingPrice, minimumOrderQty , shippingProvider ,
        Length ,breadth,weight,hsnCode,taxCode,countryOfOrgin,
        manufactureDetails,packerDetails,productDiscription,
        productTitle,intheBox,warrantyPeriod,warantyType 
        });

        await newProductVareint.save();
        res.status(201).json({ message: "Product Variant created succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createProductVariant,
    getProductVariant
}

