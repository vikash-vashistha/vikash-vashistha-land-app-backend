const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true,
    },
    short: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("url", cartSchema);
