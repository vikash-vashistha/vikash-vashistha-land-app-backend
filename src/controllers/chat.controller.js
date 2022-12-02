const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Chat = require("../models/chat.model");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // console.log("vik",req.body);
    const cartItems = await Chat.create(req.body);
    // console.log(cartItems);

    return res.send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/all", authenticate, async (req, res) => {
  try {
    const chats = await Chat.find({ user_id: req.user._id})
      .populate(["user_id", "chat_with"])
      .lean()
      .exec();
    const chats_with = await Chat.find({ chat_with: req.user._id })
      .populate(["user_id", "chat_with"])
      .lean()
      .exec();
    // console.log(cartItems);

    return res.send({chats, chats_with});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    // console.log("vik", req.body);
    const { id } = req.params;
    const chats = await Chat.find({ user_id: req.user._id, chat_with:  id})
      .populate(["user_id", "chat_with"])
      .lean()
      .exec();
    // console.log(cartItems);

    return res.send(chats);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cartItems = await Chat.deleteOne({ id });
    // console.log("ram", id);
    // console.log(cartItems);

    return res.send(cartItems);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
