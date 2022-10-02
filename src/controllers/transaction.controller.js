const express = require('express');
const authenticate = require('../middlewares/authenticate');
const Transaction = require('../models/transactions.model');

const transactionRouter = express.Router();

transactionRouter.post('', authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const transaction = await Transaction.create(req.body);
    return res.send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.get('', async (req, res) => {
  try {
    const transaction = await Transaction.find().lean().exec();

    return res.send(lands);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = transactionRouter;
