const mongoose = require("mongoose")

const stockSchemaStructure = new mongoose.Schema({

    stockqty:{ 
        type:Number,
        required:true,
    },
    productvariantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productvariantdetails",
        required:true,
    },
},{timestamps:true})

const ProductStock = mongoose.model("productstock", stockSchemaStructure);

module.exports = ProductStock