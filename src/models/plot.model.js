const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    land: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    partners: { type: Boolean },
    eastroad: { type: Boolean },
    westroad: { type: Boolean },
    northroad: { type: Boolean },
    southroad: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("plot", plotSchema);
