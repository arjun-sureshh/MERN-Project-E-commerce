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
        required: true,
        unique: true,
        trim:true,
        // validate: {
        //     validator: function (password) {
        //         const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //         return strongPasswordRegex.test(password);
        //     },
        //     message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.',
        // }
    },
    sellerMobileNumber: {
        type: Number,
        required: true,
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
        required: true,
    },
    bankAccountNo:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    ifscCode:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    storeDiscribtion:{
        type:String,
        required:true,
        trim:true,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    qcStatus:{
        type:Number,
        default:0,
    }

}, { timestamps: true })

const Seller = mongoose.model("seller", sellerSchemaStructure)

module.exports = Seller