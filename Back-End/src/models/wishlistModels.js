const mongoose = require("mongoose")

const wishlistSchemaStructure = new mongoose.Schema({

    varientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sizeheads",
        required:true,
    },
},{timestamps:true})

const Wishlist = mongoose.model("sizebodies", wishlistSchemaStructure );
module.exports = Wishlist