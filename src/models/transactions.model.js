const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["credit", "debit"] },
    date: { type: Date, required: true },
    amount: { type: String },

    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    plot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plot",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model("transactions", transactionSchema);
module.exports = Transaction;
