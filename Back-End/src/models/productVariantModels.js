const mongoose = require("mongoose");

const productVariantSchemaStructure = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productdetails",
        required: true,
    },
    qcStatus: {
        type: Number,
        default: 0,
        trim: true
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    minimumOrderQty: {
        type: Number,
        required: true,
    },
    shippingProvider: {
        type: String,
        required: true,
    },
    Length: {
        type: Number,
        required: true,
    },
    breadth: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    hsnCode: {
        type: String,
        required: true
    },
    taxCode: {
        type: String,
        required: true
    },
    countryOfOrgin: {
        type: String,
        required: true
    },
    manufactureDetails: {
        type: String,
        required: true
    },
    packerDetails: {
        type: String,
        required: true
    },
    productDiscription: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    intheBox: {
        type: String,
        required: true
    },
    warrantyPeriod: {
        type: String,
        required: true
    },
    warantyType: {
        type: String,
        required: true
    },

}, { timestamps: true })

const ProductVariant = mongoose.model("productvariantdetails", productVariantSchemaStructure)

module.exports = ProductVariant;