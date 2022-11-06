//Author : Aeshna Verma (B00880776)

const mongoose = require('mongoose')


const ExpertsSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: Number},
    email : { type: String, required: true},
    basePrice: { type: Number, default: 0 },
    address : { type: String},
    url : { type: String}
  },
  { timestamps: true }
)

module.exports = mongoose.model('experts', ExpertsSchema)
