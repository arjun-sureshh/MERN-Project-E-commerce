const mongoose = require("mongoose")

const gallerySchemaStructure = new mongoose.Schema({

    photos:{ 
        type:String,
        required:true,
    },
    varientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productvariantdetails",
        required:true,
    },
},{timestamps:true})

const Gallery = mongoose.model("productimage", gallerySchemaStructure);

module.exports = Gallery