const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    category: { type: String, required: true, enum: ['credit', 'debit'] },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'land',
      required: true,
    },
    plot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'plot',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;
