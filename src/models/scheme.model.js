const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    scheme_name: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("scheme", schemeSchema);
