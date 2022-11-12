const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Transaction = require("../models/transactions.model");

const transactionRouter = express.Router();

transactionRouter.post("", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const transaction = await Transaction.create(req.body);
    return res.send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.get("/", async (req, res) => {
  console.log(req.query)
  const page = +req.query.page || 1;
  const size = +req.query.size || 3;
  try {
    const transaction = await Transaction.find()
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Transaction.find().countDocuments()) / size
    );

    return res.send({transaction, totalPages});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = transactionRouter;
