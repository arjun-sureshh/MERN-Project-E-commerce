const Features = require("../models/keyfeaturesModels");


// Key Features get 
const getKeyFeatures = async (req, res) => {
    try {
        const keyFeaturesDetails = await Features.find();
        res.status(200).json(keyFeaturesDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching keyFeatures ", error })
    }
}


// create Keyfeature

const createKeyFeatures = async (req, res) => {
    const { productVariantId, features } = req.body; // ✅ Receive an array of features

    if (!productVariantId || !Array.isArray(features) || features.length === 0) {
        return res.status(400).json({ message: "Please provide productVariantId and at least one feature" });
    }

    try {
        const newFeatures = features.map(feature => ({
            featureTitle: feature.title,   // ✅ Extract title from the array
            featureContent: feature.content, // ✅ Extract content from the array
            productVariantId: productVariantId
        }));

        await Features.insertMany(newFeatures); // ✅ Insert multiple features at once

        res.status(201).json({ message: "Features added successfully" });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    createKeyFeatures,
    getKeyFeatures
}

