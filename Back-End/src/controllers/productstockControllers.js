const ProductStock = require("../models/productStockModels");

// product Stock get 
const getProductStock = async (req, res) => {
    try {
        const productStockDetails = await ProductStock.find();
        res.status(200).json(productStockDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching product stock ", error })
    }
}

// Product stock post
const createProductStock = async (req, res) => {
    const { stockqty, varientId } = req.body;

    if (!stockqty || !varientId  ) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newProductStock = new ProductStock({
            stockqty, varientId 
        });

        await newProductStock.save();
        res.status(201).json({ message: "Product stock Added succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createProductStock,
    getProductStock
}

