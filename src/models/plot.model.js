const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    area: {type: String},
    price: { type: String, required: true },
    date: { type: String },
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    length: { type: String },
    width: {type: String},
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    road: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("plot", plotSchema);
