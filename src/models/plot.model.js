const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    area: { type: String, require: true },
    price: { type: String, required: true },
    date: { type: String, require: true },
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    length: { type: String, require: true },
    width: { type: String, require: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    road: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("plot", plotSchema);
