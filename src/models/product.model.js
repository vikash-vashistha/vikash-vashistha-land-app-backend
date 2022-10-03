const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    date: { type: String },
    location: { type: String },
    scheme: { type: String },
    price: { type: Number },
    area: { type: Number }
  }
);

module.exports = mongoose.model("product", productSchema);
