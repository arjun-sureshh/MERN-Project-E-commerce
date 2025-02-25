 const mongoose = require("mongoose");

const sellerSchemaStructure = new mongoose.Schema({
    sellerName: {
        type: String,
        require: true,
        trim:true
    },
    sellerEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    sellerPassword: {
        type: String,
        required: false,
        unique: true,
        trim:true,
    },
    sellerMobileNumber: {
        type: Number,
        required: false,
        trim:true,
        validate: {
            validator: function (number) {
                const phoneNumber = /^\d{10}$/;
                return phoneNumber.test(number)
            },
            message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.'
        }
    },
    sellerDisplayName: {
        type: String,
        trim:true,
        required: false,
    },
    bankAccountNo:{
        type:String,
        required:false,
        unique:true,
        trim:true,
    },
    ifscCode:{
        type:String,
        required:false,
        trim:true,
        unique:true
    },
    storeDiscribtion:{
        type:String,
        required:false,
        trim:true,
    },
    RegStatges:{
        type: Number,
        required:false,
    },
    qcStatus:{
        type:Number,
        default:0,
    }

}, { timestamps: true })

const Seller = mongoose.model("seller", sellerSchemaStructure)

module.exports = Seller