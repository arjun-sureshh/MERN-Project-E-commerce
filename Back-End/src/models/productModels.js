const mongoose = require("mongoose");

const productSchemaStructure = new mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller",
        required: true,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand",
        required: false,
    },
    skuId:{
      type:Number,
      required:false,
    },
    
    ListingStatus: {
        type: Number,
        default:1,
        required: false,
    },
   
    fulfilmentBy:{
        type:String,
        required:false,
        trim:true
    },
 
    qcStatus:{
        type:Number,
        default:0,
    }

}, { timestamps: true })

const Product = mongoose.model("productdetails", productSchemaStructure)

module.exports = Product