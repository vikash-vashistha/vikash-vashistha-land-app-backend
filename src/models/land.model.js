const mongoose = require('mongoose');

const landSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String },
    scheme: { type: String },
    price: { type: Number },
    area: { type: Number },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    location: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('land', landSchema);
