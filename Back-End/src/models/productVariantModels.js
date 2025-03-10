const mongoose = require("mongoose");

const productVariantSchemaStructure = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productdetails",
        required: false,
    },
    qcStatus: {
        type: Number,
        default: 0,
        trim: true
    },
    mrp: {
        type: Number,
        required: false,
    },
    sellingPrice: {
        type: Number,
        required: false,
    },
    minimumOrderQty: {
        type: Number,
        required: false,
    },
    shippingProvider: {
        type: String,
        required: false,
    },
    Length: {
        type: Number,
        required: false,
    },
    breadth: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    hsnCode: {
        type: String,
        required: false
    },
    taxCode: {
        type: String,
        required: false
    },
    countryOfOrgin: {
        type: String,
        required: false
    },
    colorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "colors",
        required: false,
    },
    manufactureDetails: {
        type: String,
        required: false
    },
    packerDetails: {
        type: String,
        required: false
    },
    productDiscription: {
        type: String,
        required: false
    },
    productTitle: {
        type: String,
        required: false
    },
    intheBox: {
        type: String,
        required: false
    },
    warrantyPeriod: {
        type: String,
        required: false
    },
    warantySummary: {
        type: String,
        required: false
    },

}, { timestamps: true })

const ProductVariant = mongoose.model("productvariantdetails", productVariantSchemaStructure)

module.exports = ProductVariant;