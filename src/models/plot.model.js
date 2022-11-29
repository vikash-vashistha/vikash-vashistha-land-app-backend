const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String },
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    length: { type: Number },
    width: {type: Number},
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
