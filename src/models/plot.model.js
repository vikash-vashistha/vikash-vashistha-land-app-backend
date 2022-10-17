const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    land: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'land',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('plot', plotSchema);
