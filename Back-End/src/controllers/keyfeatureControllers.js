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

// KeyFeatures post
const createKeyFeatures = async (req, res) => {
    const { featureTitle, featureContent,productVariantId} = req.body;

    if (!featureTitle || !featureContent || !productVariantId) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newFeatures = new Features({
            photos, varientId
        });

        await newFeatures.save();
        res.status(201).json({ message: "features added succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createKeyFeatures,
    getKeyFeatures
}

