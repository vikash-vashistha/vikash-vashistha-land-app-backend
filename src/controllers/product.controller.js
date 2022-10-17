const express = require("express");

const Product = require("../models/product.model");

const Location = require("../models/location.model")

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const product = await Product.create(req.body);

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// getting schemes inside cities
router.get("/scheme/:city", async (req, res) => {
  try {
    const {city} = req.params;
      const Products = await Product.find({ location: new RegExp(city, "i") })
        .lean()
        .exec();
      console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// getting cities
router.get("/locations", async (req, res) => {
  try {
    let Cities;
    let {city} = req.query;
    // console.log(city);
    if (city) {
      Cities = await Location.find({ city: new RegExp(city, "i") })
        .lean()
        .exec();
      // console.log(Cities, req.query.city);
    } else {
      Cities = await Location.find().lean().exec();
    }
    return res.status(200).send(Cities);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

module.exports = router;
