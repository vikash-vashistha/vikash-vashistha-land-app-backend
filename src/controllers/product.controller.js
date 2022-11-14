const express = require("express");

const Land = require("../models/land.model");

const Location = require("../models/location.model");

const Plot = require("../models/plot.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const product = await Land.create(req.body);

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting cities
router.get("/locations", async (req, res) => {
  try {
    let Cities;
    let { city } = req.query;
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

// getting schemes inside cities
router.get("/scheme/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const Products = await Land.find({ location: new RegExp(city, "i") })
      .lean()
      .exec();
    console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting lands inside scheme
router.get("/alllands/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    // console.log(sid)
    const products = await Land.find({ scheme: sid })
      .lean()
      .exec();
    console.log(products);
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting plots in lands
router.get("/singleland/:lid", async (req, res) => {
  try {
    const { lid } = req.params;
    // db.lands.find({ _id: ObjectId("634d5260d0c9188cce90c367") });
    const Products = await Plot.find({
      land_id: lid,
    });
      
    console.log("ldfj",Products);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/plots/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const Products = await Plot.find({
      _id: pid,
    })
      .lean()
      .exec();
    console.log(Products, req.params);
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting lands by user id
router.get("/lands", authenticate, async (req, res) => {
  try {
    console.log("kdlfj")
    const Products = await Land.find({
      partenrs: { $in: [{ user_id: req.user._id }] },
    })
      .lean()
      .exec();
    console.log(Products)
    return res.status(200).send(Products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
