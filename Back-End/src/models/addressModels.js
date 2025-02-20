const mongoose = require("mongoose")

const addressSchemaStructure = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usres",
        default:null,
        trim:true
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers",
        default:null,
        trim:true
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "districts",
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
},{timestamps:true})

const Address = mongoose.model("address", addressSchemaStructure);

module.exports = Address;