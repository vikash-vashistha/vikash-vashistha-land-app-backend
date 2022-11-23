const mongoose = require("mongoose");

const landSchema = new mongoose.Schema(
  {
    date: { type: String },
    location: { type: String, required: true },
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheme",
      require: true,
    },
    price: { type: Number },
    area: { type: Number },
    partenrs: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    electricity: { type: Boolean },
    road: { type: Boolean },
    sewerage: { type: Boolean },
    water: { type: Boolean },
    facility: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("land", landSchema);
