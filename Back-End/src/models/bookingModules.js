const mongoose = require("mongoose")

const orderSchemaStructure = new mongoose.Schema({

  amount: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: Number,
    default: null,
    trim: true
  }
}, { timestamps: true })

const Booking = mongoose.model("booking", orderSchemaStructure);
module.exports = Booking
