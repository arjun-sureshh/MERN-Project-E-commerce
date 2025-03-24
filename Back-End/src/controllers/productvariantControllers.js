const { default: mongoose } = require("mongoose");
const ProductVariant = require("../models/productVariantModels");


// product get 
const getProductVariant = async (req, res) => {
    try {
        const productvariantDetails = await ProductVariant.find();
        res.status(200).json(productvariantDetails);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching product ", error })
    }
};

// get the Varaint by ProductId to QC department
const getVariantToQC = async (req, res) => {
    const { productIds } = req.body; // Expecting an array from frontend

    if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).json({ message: "Invalid Product IDs" });
    }

    try {
        const productVariantDetails = await ProductVariant.find({ productId: { $in: productIds } });

        res.status(200).json({ message: "Fetching Product Variant successful", data: productVariantDetails });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Product Variant ", error });
    }
};



// get product based on the productId

const getVaraintByID = async(req,res) =>{
    const {productVaraintId} = req.params;
try {
    const productDetails = await ProductVariant.findById(productVaraintId);
    if (!productDetails) {
        return res.status(404).json({ message: "Product Varaint not found with the given ID." });
    }

    res.status(200).json({ 
        message: "Product Variant fetched successfully", 
        data:productDetails 
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product Varaint", error });
}
};

// get product varaint by the product id  based on the productId

const getVaraintByProductID = async(req,res) =>{
    const {productId} = req.params;
    
try {
    const productDetails = await ProductVariant.findOne({productId:productId});
    if (!productDetails) {
        return res.status(404).json({ message: "Product Varaint not found with the given ID." });
    }

    res.status(200).json({ 
        message: "Product Variant fetched successfully", 
        data: productDetails 
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product Varaint", error });
}
};



// get product Details by Seller ID
const getVaraintBySellerID = async (req, res) => {
    const { sellerId } = req.params;


    try {
               // Ensure sellerId is a valid ObjectId
               if (!mongoose.Types.ObjectId.isValid(sellerId)) {
                return res.status(400).json({ message: "Invalid Product ID" });
            }

            const sellerObjectId = new mongoose.Types.ObjectId(String(sellerId));

        const productVaraintDetails = await ProductVariant.aggregate([
            
            {
                $lookup:{
                    from:"productdetails",
                    localField:"productId",
                    foreignField:"_id",
                    as:"productDetails"
                }
            },
            {
                $unwind:{
                    path:"$productDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
          
            {
                $match: {
                    "productDetails.sellerId": sellerObjectId,
                    "productDetails.qcStatus": 1 // Only fetch products where qcStatus is 1
                }
            },
            {
                $lookup:{
                    from:"colors",
                    localField:"colorId",
                    foreignField:"_id",
                    as:"colorDetails"
                }
            },
            
            {
                $unwind:{
                    path:"$colorDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $lookup: {
                    from: "categories", // Lookup Category details
                    localField: "productDetails.categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: {
                    path: "$categoryDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "brands", // Lookup Brand details if applicable
                    localField: "productDetails.brandId",
                    foreignField: "_id",
                    as: "brandDetails"
                }
            },
            {
                $unwind: {
                    path: "$brandDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project:{
                    _id: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    productDiscription: 1,
                    productTitle: 1,
                    colorId: 1,
                    colorName:"$colorDetails.color",
                    fulfilmentBy: "$productDetails.fulfilmentBy", // Assuming 'name' is the field for category name
                    brandName: "$brandDetails.brandName" ,// Assuming 'name' is the field for brand name
                    categoryName:"$categoryDetails.categoryName",
                    productId:"$productDetails._id",
                }
            }
        ]);

        if (!productVaraintDetails || productVaraintDetails.length === 0) {
            return res.status(404).json({ message: "No products found for the given seller ID." });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            data: productVaraintDetails
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// create product varaint
const createProductVariant = async (req, res) => {

    const { productId } = req.body;

    try {
       
        const newProductVareint = new ProductVariant({
            productId
        });

        await newProductVareint.save();
        res.status(201).json({ message: "Product Variant created succeccfully", data:newProductVareint });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

const updateProductVariant = async (req, res) => {
    const { productVaraintId } = req.params;
    const {
        productId, mrp, sellingPrice, minimumOrderQty, shippingProvider,
        Length, breadth,height, weight, hsnCode, taxCode, countryOfOrgin,
        manufactureDetails, packerDetails, productDiscription,
        productTitle, procurementSLA, procurementType, colorId, 
        intheBox, warrantyPeriod, warantySummary
    } = req.body;

    try {
        if (!productVaraintId) {
            return res.status(404).json({ message: "We can't find Product Variant by this Variant ID" });
        }

        // ✅ Handle empty colorId: Set it to null if it's empty
        let updateData = {
            productId, mrp, sellingPrice, minimumOrderQty, shippingProvider,
            Length, breadth,height, weight, hsnCode, taxCode, countryOfOrgin,
            manufactureDetails, packerDetails, productDiscription,
            productTitle, procurementSLA, procurementType, intheBox, 
            warrantyPeriod, warantySummary
        };

        // ✅ Only add colorId if it's valid (not empty or invalid ObjectId)
        if (colorId && mongoose.Types.ObjectId.isValid(colorId)) {
            updateData.colorId = colorId;
        } else {
            updateData.colorId = null; // Or delete updateData.colorId;
        }

        // ✅ Update the product variant
        const updatedData = await ProductVariant.findByIdAndUpdate(
            productVaraintId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Product Variant not found" });
        }

        res.status(200).json({ message: "Product Variant updated successfully", data: updatedData });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Server error" });
    }
};


// delete the product varaint
const deleteProductVaraint = async (req,res) =>{

try {
        const { id } = req.params;

        const deleted = await ProductVariant.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "Product Variant   not found" });
        } else {
            res.json({ message: "Product deleted successfully", deleted });
        }

    } catch (error) {
        console.error("Error deleting in Product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createProductVariant,
    getProductVariant,
    updateProductVariant,
    getVaraintBySellerID,
    deleteProductVaraint,
    getVaraintByProductID,
    getVaraintByID,
    getVariantToQC
}

