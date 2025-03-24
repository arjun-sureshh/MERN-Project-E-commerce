const { default: mongoose } = require("mongoose");
const Product = require("../models/productModels");



// get all products
const getProduct = async (req, res) => {

    try {
        const productDetails = await Product.find();
        res.status(200).json({ message: "Fetching Data From Product Model is Successfull", data: productDetails });

    } catch (error) {
        res.status(500).json({ message: "Error in fetching product ", error })
    }
};

// get approved seller details

const getApprovedProduct = async (req,res) =>{
    try {
        const productDetails = await Product.find({ListingStatus : 4, qcStatus:1 });
        res.status(200).json({message:"fetching Approved Product details successfull",data:productDetails})
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching Product ", error})
    }
};

// get approved seller details
const getRejectedProduct = async (req,res) =>{
    try {
        const productDetails = await Product.find({ListingStatus : 4, qcStatus:-1 });
        res.status(200).json({message:"fetching Rejected Product details successfull",data:productDetails})
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching Product ", error})
    }
};


// get all product with lisiting status is 4 ad qc status is 0
const getProductToQC = async (req, res) => {
    try {
        const productDetails = await Product.aggregate([
            {
                $match: { ListingStatus: 4, qcStatus: 0 }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: {
                    path: "$categoryDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brandDetails"
                }
            },
            
            {
                $unwind: {
                    path: "$brandDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $lookup: {
                    from: "sellers",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "sellerDetails"
                }
            },
            
            {
                $unwind: {
                    path: "$sellerDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $project: {
                    _id: 1,
                    sellerId: 1,
                    skuId: 1,
                    ListingStatus: 1,
                    fulfilmentBy: 1,
                    qcStatus: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    localDeliveryCharge: 1,
                    zonalDeliveryCharge: 1,
                    categoryName: "$categoryDetails.categoryName", // Assuming 'name' is the field for category name
                    brandName: "$brandDetails.brandName", // Assuming 'name' is the field for brand name
                    sellerName:"$sellerDetails.sellerName",
                }
            }
        ]);
        if (!productDetails || productDetails.length === 0) {
            return res.status(404).json({ message: "No products found for the given seller ID." });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            data: productDetails
        });

    } catch (error) {
        console.error("Error in getProductToQC:", error);
        res.status(500).json({ message: "Error in fetching product", error: error.message });
    }
};

// get product based on the productId

const getProductByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const productDetails = await Product.findById(productId);
        if (!productDetails) {
            return res.status(404).json({ message: "Product not found with the given ID." });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            data: productDetails
        });

      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// get product Details by Seller ID
const getProductBySellerID = async (req, res) => {
    const { sellerId } = req.params;


    try {

        // Ensure sellerId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ message: "Invalid seller ID" });
        }

        const sellerObjectId = new mongoose.Types.ObjectId(String(sellerId));

        const productDetails = await Product.aggregate([
            {
                $match: { sellerId: sellerObjectId , qcStatus : 0 }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $lookup: {
                    from: "brand",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brandDetails"
                }
            },
            {
                $unwind: {
                    path: "$categoryDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $unwind: {
                    path: "$brandDetails",
                    preserveNullAndEmptyArrays: true // If no category is found, keep null instead of removing the document
                }
            },
            {
                $project: {
                    _id: 1,
                    sellerId: 1,
                    skuId: 1,
                    ListingStatus: 1,
                    fulfilmentBy: 1,
                    qcStatus: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    categoryName: "$categoryDetails.categoryName", // Assuming 'name' is the field for category name
                    brandName: "$brandDetails.brandName" // Assuming 'name' is the field for brand name
                }
            }
        ]);

        if (!productDetails || productDetails.length === 0) {
            return res.status(404).json({ message: "No products found for the given seller ID." });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            data: productDetails
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// get product bY Id 
const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const productDetails = await Product.findById(productId).select("ListingStatus sellerId"); // Fetch only required fields

        if (!productDetails) {
            return res.status(404).json({ message: "Product not found with the given ID." });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            productDetails
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};


// create product when the page loads
const createProduct = async (req, res) => {
    const { sellerId, categoryId } = req.body;

    if (!sellerId || !categoryId) {
        return res.status(400).json({ message: "seller must be login or select category properly" })
    }

    try {

        const newProduct = new Product({
            sellerId, categoryId, ListingStatus:2,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "product created successfully with category",
            product: savedProduct
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
    const { productId } = req.params;
    const { brandId } = req.body;


    if (!brandId || !productId) {
        return res.status(400).json({ message: "Please provide Brand Id" });
    }

    try {
        const updatedBrandId = await Product.findByIdAndUpdate(
            productId,
            { brandId: brandId, ListingStatus: 3 },
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

// update the product Qcstatus
const updateQcStatus = async (req,res) =>{
    const {productId} = req.params;
    const {qcStatus} = req.body;
    

    if ( !qcStatus ) {
        return res.status(400).json({ message: "Please provide teh Qc status" });
    }

    try {
        const updateData = await Product.findByIdAndUpdate(
            productId, 
            { qcStatus:qcStatus }, 
            { new: true, runValidators: true }
        );

        if (!updateData) {
            return res.status(404).json({ message: "Product  Not Found" });
        }

        res.status(200).json({ message: "Product Approved", data: updateData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// update Skui Id and fulfilement in to  product 

const updateSkuidAndFullfilement = async (req, res) => {
    const { productId } = req.params;
    const { skuId, fulfilmentBy, localDeliveryCharge, zonalDeliveryCharge, ListingStatus } = req.body;

    if (!skuId || !productId || !fulfilmentBy || !ListingStatus) {
        return res.status(400).json({ message: "Please provide skuid and fullfilement" });
    }

    try {
        const updatedData = await Product.findByIdAndUpdate(
            productId,
            {
                skuId, fulfilmentBy,
                localDeliveryCharge,
                zonalDeliveryCharge,
                ListingStatus: ListingStatus
            },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "skuid and fullfilemnt updated to product successfully", product: updatedData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// delete the product 
const deleteProduct = async (req, res) => {

    try {
        const { id } = req.params;

        const deleted = await Product.findByIdAndDelete(id)
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
    createProduct,
    getProduct,
    getProductById,
    updateBrandId,
    getProductBySellerID,
    updateSkuidAndFullfilement,
    deleteProduct,
    getProductByProductId,
    getProductToQC,
    updateQcStatus,
    getApprovedProduct,
    getRejectedProduct
}

