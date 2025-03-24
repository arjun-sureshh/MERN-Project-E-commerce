const mongoose = require("mongoose");

const gallerySchemaStructure = new mongoose.Schema({
    photos: { 
        type: String,  // Store only the image filename
        required: false,
    },
    varientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productvariantdetails",
        required: false,
    },
}, { timestamps: true });

const Gallery = mongoose.model("productimage", gallerySchemaStructure);

module.exports = Gallery;
