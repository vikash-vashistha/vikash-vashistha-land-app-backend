const express = require("express");
const Request = require("../models/request.model");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/admin", authenticate, async (req, res) => {
  console.log("inside admin request get");
  try {
  const request = await Request.find().populate(["user_id"]).lean().exec();
    console.log(request);

    return res.status(200).send(request);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const request = await Request.deleteOne({ _id: id }).lean().exec();

    return res.status(200).send(request);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/:id", async (req, res) => {
  console.log("inside request post");
  try {
    const { id } = req.params;
    console.log(id);
    const request = await Request.create({user_id: id});

    return res.status(200).send(request);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
