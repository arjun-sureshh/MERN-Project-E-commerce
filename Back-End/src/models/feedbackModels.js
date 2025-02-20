const mongoose = require("mongoose")

const FeedbackSchemaStructure = new mongoose.Schema({

    ratting: {
        type: Number,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "myCart",
        required: true,
    },
    

}, { timestamps: true })

const Feedback = mongoose.model("feedBack", FeedbackSchemaStructure);
module.exports = Feedback
