const express = require("express");
const Scheme = require("../models/scheme.model");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Products = await Scheme.find({}).lean().exec();
    // console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting schemes inside cities
router.get("/all/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const Products = await Scheme.find({ city: new RegExp(city, "i") })
      .lean()
      .exec();
    // console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    return res.status(200).send(scheme);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/admin", authenticate, async (req, res) => {
  console.log("Inside scheme");
  try {
    let scheme;
    let { scheme_name } = req.query;
    console.log(scheme_name);
    if (scheme_name) {
      scheme = await Scheme.find({
        scheme_name: new RegExp(scheme_name, "i"),
      })
        .lean()
        .exec();
      // console.log(Cities, req.query.city);
    } else {
      scheme = await Scheme.find().lean().exec();
    }

    return res.status(200).send(scheme);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const scheme = await Scheme.deleteOne({ _id: id }).lean().exec();

    return res.status(200).send(scheme);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
