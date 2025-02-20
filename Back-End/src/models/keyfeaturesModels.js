const mongoose = require("mongoose")

const featuresSchemaStructure = new mongoose.Schema({

    featureTitle:{ 
        type:String,
        required:true,
    },
    featureContent:{
        type:String,
        required:true,
    },
    productVariantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productvariantdetails",
        required:true,
    },
},{timestamps:true})

const Features = mongoose.model("features", featuresSchemaStructure);

module.exports = Features