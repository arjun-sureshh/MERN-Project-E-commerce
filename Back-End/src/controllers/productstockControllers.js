const ProductStock = require("../models/productStockModels");

// product Stock get 
const getProductStock = async (req, res) => {
    try {
        const productStockDetails = await ProductStock.find();
        res.status(200).json(productStockDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching product stock ", error })
    }
};


// get the Address by SellerID
const getStockByVariantIds = async (req, res) => {
    const { productVariantIds } = req.body; // Expecting an array from frontend

    if (!productVariantIds || !Array.isArray(productVariantIds)) {
        return res.status(400).json({ message: "Invalid Product Variant IDs" });
    }

    try {
        const stockDetails = await ProductStock.find({ productvariantId: { $in: productVariantIds } });

        res.status(200).json({ message: "Fetching stock successful", data: stockDetails });
    } catch (error) {
        res.status(500).json({ message: "Error stock addresses", error });
    }
};

// product Stock get by varaint Id 
const getStockByProductVaraintId = async (req, res) => {

    const {productVaraintId} = req.params;
    try {
        const productStockDetails = await ProductStock.findOne({productvariantId:productVaraintId});
        

        if (!productStockDetails) {
            return res.status(404).json({ message: "Product Stock not found with the given ID." });
        }
        res.status(200).json({ 
            message: "Product Stock fetched successfully", 
            data: productStockDetails 
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Product stock post
const createProductStock = async (req, res) => {
    const { stockqty, productvariantId } = req.body;

    if (!stockqty || !productvariantId  ) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newProductStock = new ProductStock({
            stockqty, productvariantId 
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

// add stock
const AddProductStock = async (req, res) => {
    try {
        const { stockqty } = req.body;
        const { productvariantId } = req.params;

        console.log("Product Variant ID:", productvariantId);

        // Validate input
        if (!stockqty || !productvariantId) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Convert stockqty to number
        const stockToAdd = Number(stockqty);
        if (isNaN(stockToAdd)) {
            return res.status(400).json({ message: "Invalid stock quantity" });
        }

        // Find the existing stock (Optional, for logging/debugging)
        const existingStock = await ProductStock.findOne({productvariantId: productvariantId });
        console.log("Existing Stock Before Update:", existingStock?.stockqty ?? "Not Found");

        // Update stock quantity (Increment stock)
        const updatedStock = await ProductStock.findOneAndUpdate(
            { productvariantId }, // Query filter
            { $inc: { stockqty: stockToAdd } },  // Increment the stock field
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedStock) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        console.log("Updated Stock:", updatedStock.stock);

        res.status(200).json({ message: "Product stock updated successfully", data: updatedStock });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Server error" });
    }
};




// Product stock post
const updateProductStock = async (req, res) => {
    const { stockqty } = req.body;
    const {productvariantId} = req.params;

    if (!stockqty || !productvariantId  ) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newProductStock = await ProductStock.findByIdAndUpdate(
            productvariantId,
            stockqty,
            {new: true, runValidators: true}
    );

        await newProductStock.save();
        res.status(201).json({ message: "Product stock Updated succeccfully" });
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
    getProductStock,
    getStockByProductVaraintId,
    getStockByVariantIds,
    updateProductStock,
    AddProductStock
}

