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
    partners: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          require: true,
        
      },
    ],
    status: { type: Boolean },
    title: { type: String, required: true},
    facility: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("land", landSchema);
