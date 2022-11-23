const express = require("express");


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



module.exports = router;
