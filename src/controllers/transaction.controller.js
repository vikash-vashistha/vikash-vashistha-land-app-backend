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

transactionRouter.get("/", authenticate, async (req, res) => {
  console.log("inside transaction by user")
  const page = +req.query.page || 1;
  const size = +req.query.size || 3;
  try {
    // console.log("user",req.user)
    const transaction = 
      await Transaction.find({ from: req.user._id }).populate(["to", "from", "land_id", "plot_id"]).skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();
// console.log(transaction);
    const totalPages = Math.ceil(
      (await Transaction.find().countDocuments()) / size
    );

    return res.send({transaction, totalPages});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.get("/balance/:tid", authenticate, async (req, res) => {
  try {
    const { tid } = req.params;
    const transaction = await Transaction.find({ _id: tid })
      .populate(["to", "from", "land_id", "plot_id"]).lean()
      .exec();
    // console.log(transaction);

    return res.send({ transaction });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.post("/admin", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    return res.status(200).send(transaction);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.get("/admin", authenticate, async (req, res) => {
  console.log("Inside transaction");
  try {
    let transaction;
    let { transaction_id } = req.query;
    if (transaction_id) {
      transaction = await Transaction.find({
        transaction_id: new RegExp(transaction_id, "i")
      })
      .populate(["to", "from", "land_id", "plot_id"])
      .lean()
      .exec();
      // console.log(transaction);
    } else {
      transaction = await Transaction.find()
        .populate(["to", "from", "land_id", "plot_id"])
        .lean()
        .exec();
    }

    return res.status(200).send(transaction);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

transactionRouter.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const transaction = await Transaction.deleteOne({ _id: id }).lean().exec();

    return res.status(200).send(transaction);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = transactionRouter;
