const express = require("express");
const URL = require("../models/url.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const url = await URL.create(req.body);
    return res.send(url);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  console.log("inside transaction by user");
  try {
    // console.log("user",req.user)
    const url = await URL.find({short: req.body.short
    }).lean()
      .exec();

    return res.send({ url, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
