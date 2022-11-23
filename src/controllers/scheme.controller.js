const express = require("express")
const Scheme = require("../models/scheme.model")
const router = express.Router();

// getting schemes inside cities
router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const Products = await Scheme.find({ city: new RegExp(city, "i") })
      .lean()
      .exec();
    console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;