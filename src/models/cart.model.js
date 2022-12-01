const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    plot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plot",
      require: true,
    },
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
