const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Cart = require("../models/cart.model");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    console.log("vik",req.body);
    const cartItems = await Cart.create(req.body);
    // console.log(cartItems);

    return res.status(201).send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    // console.log("vik", req.body);
    const cartItems = await Cart.find({ user_id: req.user._id })
      .populate(["user_id", "plot_id", "land_id"])
      .lean()
      .exec();
    // console.log(cartItems);

    return res.status(200).send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cartItems = await Cart.deleteOne({id})
    // console.log("ram", id);
    // console.log(cartItems);

    return res.status(200).send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("/admin", authenticate, async (req, res) => {
  console.log("Inside cart");
  try {
    let cart;
    let { user } = req.query;
    console.log("cart");
    if (user) {
      cart = await Cart.find({
        user_id: user,
      })
        .populate(["user_id", "land_id", "plot_id"])
        .lean()
        .exec();
    } else {
      cart = await Cart.find()
        .populate(["user_id", "land_id", "plot_id"])
        .lean()
        .exec();
    }

    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cart = await Cart.deleteOne({ _id: id }).lean().exec();

    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
