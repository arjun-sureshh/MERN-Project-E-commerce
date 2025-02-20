const mongoose = require("mongoose")

const searchKeywordSchemaStructure = new mongoose.Schema({
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productvariantdetails",
        required: true,
    },
    searchKeyword:{
        type: String,
        required: true,
    },
    
},{timestamps:true})

const SearchKeywords = mongoose.model("searchKeyword", searchKeywordSchemaStructure);

module.exports = SearchKeywords;