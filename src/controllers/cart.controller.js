const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Cart = require("../models/cart.model");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    console.log("vik",req.body);
    const cartItems = await Cart.create(req.body);
    // console.log(cartItems);

    return res.send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    console.log("vik", req.body);
    const cartItems = await Cart.find({ user_id: req.user._id }).populate(["user_id", "plot_id", "land_id"]).lean().exec();
    // console.log(cartItems);

    return res.send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
