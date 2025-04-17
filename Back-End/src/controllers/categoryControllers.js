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


const searchCategory = async (req, res) => {
  try {
    const { searchData } = req.params;

    if (!searchData) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const categories = await Category.aggregate([
      // Match categories by name (case-insensitive)
      {
        $match: {
          categoryName: { $regex: `^${searchData}`, $options: "i" },
        },
      },
      // Lookup all parent categories recursively
      {
        $graphLookup: {
          from: "categories",
          startWith: "$mainCategory", // Start from the matched category's mainCategory
          connectFromField: "mainCategory", // Field pointing to the parent
          connectToField: "_id", // Field to match against (parent's _id)
          as: "parentCategories",
          depthField: "depth", // Track hierarchy level
        },
      },
      // Sort parentCategories by depth in ascending order (root first)
      {
        $addFields: {
          allCategories: {
            $concatArrays: [
              "$parentCategories",
              [{ _id: "$_id", categoryName: "$categoryName", depth: { $add: [{ $max: "$parentCategories.depth" }, 1] } }],
            ],
          },
        },
      },
      // Unwind to process each category in the hierarchy
      {
        $unwind: {
          path: "$allCategories",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Sort by depth to ensure root-to-leaf order
      {
        $sort: {
          "allCategories.depth": 1,
        },
      },
      // Group back and construct the full path
      {
        $group: {
          _id: "$_id",
          categoryName: { $first: "$categoryName" },
          allCategories: { $push: "$allCategories" },
        },
      },
      // Construct the fullPath
      {
        $addFields: {
          fullPath: {
            $reduce: {
              input: "$allCategories",
              initialValue: "",
              in: {
                $concat: [
                  "$$value",
                  { $cond: [{ $eq: ["$$value", ""] }, "", "/"] }, // Add "/" only after first element
                  "$$this.categoryName",
                ],
              },
            },
          },
        },
      },
      // Final projection
      {
        $project: {
          _id: 1,
          categoryName: 1,
          fullPath: 1,
        },
      },
      // Sort alphabetically by fullPath
      { $sort: { fullPath: 1 } },
    ]);

    return res.json(categories);
  } catch (error) {
    console.error("Error searching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategory
}

