const mongoose = require("mongoose")

const addressSchemaStructure = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usres",
        default:null,
        trim:false
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers",
        default:null,
        trim:false
    },
    address: {
        type: String,
        default:null,
        required: false,
    },
    pincode: {
        type: String,
        default:null,
        required: false,
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "districts",
        default:null,
        required: false,
    },
    city: {
        type: String,
        default:null,
        required: false,
    }
},{timestamps:true})

const Address = mongoose.model("address", addressSchemaStructure);

module.exports = Address;