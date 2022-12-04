const express = require("express");
const authenticate = require("../middlewares/authenticate");
const User = require("../models/user.model");

const router = express.Router();

router.get("/all", authenticate, async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", authenticate, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id })
      .lean()
      .exec();
    // console.log(user);

    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/admin", authenticate, async (req, res) => {
  try {
     let user;
     let { name } = req.query;
     console.log(name);
     if (name) {
       user = await User.find({ name: new RegExp(name, "i") })
         .lean()
         .exec();
       // console.log(Cities, req.query.city);
     } else {
      user = await User.find().lean().exec();
     }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.deleteOne({_id: id}).lean().exec();
    

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
