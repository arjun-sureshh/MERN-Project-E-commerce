const SearchKeywords = require("../models/searchKeywordsModels");

// get searchKeyword
const getSearchKeyword = async (req, res) => {
    try {
        const searchkeywordDetails = await SearchKeywords.find();
        res.status(200).json({ searchkeywordDetails });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching searchKeyword ", error })
    }
}

// post searchKeyword

const createSearchKeyword = async (req, res) => {

    const { productVariantId, searchKeyword } = req.body;
    try {
       
        // save the address
        const newSearchKeyword = new SearchKeywords({
            productVariantId, searchKeyword
        })
        await newSearchKeyword.save();
        res.status(201).json({ message: " SearchKeyword Added successfully" })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createSearchKeyword,
    getSearchKeyword
}