const express = require("express");
const authenticate = require("../middlewares/authenticate");


const Location = require("../models/location.model");

const Plot = require("../models/plot.model");



const router = express.Router();



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




// getting plots in lands
router.get("/singleland/:lid", async (req, res) => {
  try {
    const { lid } = req.params;
    const { category, sortBy, range } = req.query;
    let products;
    if (category) {
      products = await Plot.find({
        land_id: lid,
        road: { $all: typeof category === Array ? [...category] : category },
      })
        .populate(["land_id", "user_id"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    } else {
      products = await Plot.find({
        land_id: lid,
      })
        .populate(["land_id", "user_id"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    }
    // console.log(products);
    return res.status(200).send(products);
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
        .populate(["land_id", "user_id"])
        .lean()
        .exec();
      // console.log(Products, req.params);
      return res.status(200).send(Products);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});


router.post("/", async (req, res) => {
  try {
    // req.body.user_id = req.user._id;
    // user_id: req.user._id
    // console.log("viK", req.body);
    const product = await Plot.create(req.body);
    // console.log(product);
    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
