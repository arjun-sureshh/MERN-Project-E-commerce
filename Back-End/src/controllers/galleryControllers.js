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
    const { photos, varientId} = req.body;

    if (!photos || !varientId) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newGallery = new Gallery({
            photos, varientId
        });

        await newGallery.save();
        res.status(201).json({ message: "image Added succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createGallery,
    getGallery
}

