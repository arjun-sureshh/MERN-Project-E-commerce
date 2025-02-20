const Category = require("../models/categoryModels");
const mongoose = require("mongoose")


// category get 
const getCategory = async (req, res) => {
    // try {
    //     const categoryDetails = await Category.find();
    //     res.status(200).json(categoryDetails);

    // } catch (error) {
    //     res.status(500).json({ message: "Error in fetching Category ", error })
    // }

    try {
        const categoryDetails = await Category.aggregate([
            {
                $lookup: {
                    from: "categories",  // Lookup in the same 'categories' collection
                    localField: "mainCategory",  // The field in the current collection
                    foreignField: "_id",  // The corresponding field in the referenced collection
                    as: "mainCategoryDetails"  // Output array field
                }
            },
            {
                $unwind: {
                    path: "$mainCategoryDetails",
                    preserveNullAndEmptyArrays: true  // Keep categories without mainCategory
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    mainCategory: {
                        $ifNull: ["$mainCategoryDetails.categoryName", ""]
                    }, // Replace null with "No Main Category"
                    mainCategoryId: "$mainCategoryDetails._id"
                }
            }
        ]);

        res.status(200).json(categoryDetails);
    } catch (error) {
        console.error("Error finding Category details:", error);
        res.status(500).json({ message: "Error in fetching Categories", error });
    }

}

// get payment method by id
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const findItem = await Category.findById(id);
        if (findItem) {
            res.status(200).json({ message: "got the Category ", data: findItem })
        } else {
            res.status(404).json({ message: "requested Category is not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error in fetching Category  ", error })
    }
}


// category post
const createCategory = async (req, res) => {
    const { categoryName, mainCategory } = req.body;

    if (!categoryName) {
        return res.status(400).json({ message: "Please provide Category Name" })
    }

    try {
        const existingCategory = await Category.findOne({ categoryName: { $regex: new RegExp("^" + categoryName + "$", "i") } });
        if (existingCategory) {
            return res.status(400).json({ message: " This category is already exists " })
        }

        // ✅ Convert empty string to null (to prevent "Cast to ObjectId failed" error)
        const formattedMainCategory = mainCategory && mongoose.Types.ObjectId.isValid(mainCategory)
            ? new mongoose.Types.ObjectId(mainCategory)
            : null;

        const newCategory = new Category({
            categoryName,
            mainCategory: formattedMainCategory
        });

        await newCategory.save();
        res.status(201).json({ message: "Category created succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};


// delete Brand 
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Category.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        } else {
            res.json({ message: "Category deleted successfully", deleted });
        }

    } catch (error) {
        console.error("Error deleting in Category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//  update Brand by id 

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, mainCategory } = req.body;
        const findItem = await Category.findById(id);

        // let existingCategory = await Category.findOne({categoryName : { $regex: new RegExp("^" + categoryName + "$", "i") }})

        // if(existingCategory){
        //     return res.status(400).json({message:"This Category is already exists"})
        // }

        if (findItem) {
            const updateItem = await Category.findByIdAndUpdate(
                id,
                { categoryName, mainCategory },
                { new: true }
            );
            res.status(201).send({ message: "Category Changed", updateItem });
        } else {
            res.status(404).json({ message: "Category is not found " })
        }
    } catch (error) {
        console.error("Error updateing in Category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}

