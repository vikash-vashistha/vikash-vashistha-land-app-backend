const express = require("express");
const authenticate = require("../middlewares/authenticate");
const User = require("../models/user.model");

const router = express.Router();

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

module.exports = router;
