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
}


// get product Details by Seller ID
const getVaraintByProductID = async (req, res) => {
    const { sellerId } = req.params;
console.log(sellerId);


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
                    productId:"$productDetails._id"
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

// Update Balance fileds to Product Varaint
const updateProductVariant = async (req, res) => {

const {productVaraintId} = req.params;

    const { productId,mrp, sellingPrice, minimumOrderQty , shippingProvider ,
        Length ,breadth,weight,hsnCode,taxCode,countryOfOrgin,
        manufactureDetails,packerDetails,productDiscription,
        productTitle,intheBox,warrantyPeriod,warantySummary } = req.body;
console.log(productId);

    try {
        if(!productVaraintId){
            return res.status(404).json({message:" we can't Find Product Varaint By this Varaint ID"})
        }
       
        const updatedData = await ProductVariant.findByIdAndUpdate(
            productVaraintId, 
            { productId,mrp, sellingPrice, minimumOrderQty , shippingProvider ,
                Length ,breadth,weight,hsnCode,taxCode,countryOfOrgin,
                manufactureDetails,packerDetails,productDiscription,
                productTitle,intheBox,warrantyPeriod,warantySummary}, 
            { new: true, runValidators: true }
        );


        await updatedData.save();
        res.status(201).json({ message: "Product Variant Updated succeccfully", data:updatedData });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
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
    getVaraintByProductID,
    deleteProductVaraint
}

