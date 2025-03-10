const Gallery = require("../models/galleryModels");


// gallery get 
const getGallery = async (req, res) => {
    try {
        const photoDetails = await Gallery.find();
        res.status(200).json(photoDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching gallery ", error })
    }
}

// Gallery post
const createGallery = async (req, res) => {
    const { productVariantId, productImage } = req.body; // ✅ Receiving an array of keywords

    if (!productVariantId || !Array.isArray(productImage) || productImage.length === 0) {
        return res.status(400).json({ message: "Please provide productVariantId and at least one search keyword" });
    }

    try {
        // ✅ Create keyword entries for each keyword in the array
        const newImages = productImage.map((item) => ({
            productVariantId: productVariantId,
            searchKeyword: item.productImage // ✅ Extract keyword value
        }));

        await Gallery.insertMany(newImages); // ✅ Insert all keywords at once

        res.status(201).json({ message: "Search keywords added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createGallery,
    getGallery
}

