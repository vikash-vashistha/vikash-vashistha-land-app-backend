const mongoose = require("mongoose");

const landSchema = new mongoose.Schema(
  {
    date: { type: String, require: true },
    location: { type: String, required: true },
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheme",
      require: true,
    },
    price: { type: Number, require: true },
    area: { type: Number, require: true },
    partners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
        unique: true
      },
    ],
    status: { type: Boolean, require: true },
    title: { type: String, required: true, unique: true },
    facility: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("land", landSchema);
