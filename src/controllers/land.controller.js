const express = require("express");
const Land = require("../models/land.model");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     // req.body.user_id = req.user._id;
//     // user_id: req.user._id
//     // console.log(req.user._id);
//     const product = await Land.find({partners: {$in: req.user._id}});
// // console.log(product);
//     return res.send(product);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    // req.body.user_id = req.user._id;
    // user_id: req.user._id
    // console.log(req.body)
    const product = await Land.create(req.body);

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/partner/:id", async (req, res) => {
  try {
    // req.body.user_id = req.user._id;
    // user_id: req.user._id
    console.log(req.body)
    const { id } = req.params;
    console.log(id);
    const product = await Land.updateOne({_id: id}, {partners: req.body});
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// router.get("seller/:id", async (req, res) => {
//   try {
//     // req.body.user_id = req.user._id;
//     // user_id: req.user._id
//     const { id } = req.params;
//     // console.log(req.body);
//     const product = await Land.find({_id: id});

//     return res.send(product);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

// getting lands inside scheme
router.get("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    // console.log("req.query", req.query, sid)
    const { category, sortBy, range } = req.query;
    let products
    if (category) {
      // products = await Land.find({
      //   scheme: sid,
      //   facility: { $in: typeof category === Array ? [...category] : category },
      // })
      //   .sort({ price: sortBy == "HTL" ? -1 : 1 })
      //   .lean()
      //   .exec();
      products = await Land.find({
        scheme: sid,
        facility: {
          $all: typeof category === Array ? [...category] : category,
        },
      })
      .populate(["scheme", "partners"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    } else {
      products = await Land.find({
        scheme: sid,
      })
        .populate(["scheme", "partners"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    }
    // console.log(products)
    // db.lands.find({
    //   scheme: "63727fa8fe51d531ee219225",
    //   facility: { $in: ["water"] },
    // });
    // console.log(products);

    // this query is working in mongodb but not working in mongooes.(this was due to relations)
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// getting lands by user id
// router.get("/lands", authenticate, async (req, res) => {
//   try {
//     console.log("kdlfj")
//     const Products = await Land.find({
//       partenrs: { $in: [{ user_id: req.user._id }] },
//     })
//       .lean()
//       .exec();
//     console.log(Products)
//     return res.status(200).send(Products);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });


// Getting lands of a seller

router.get("/seller/all", authenticate, async (req, res) => {
  console.log("inside seller");
  try {
    const { category, sortBy, range } = req.query;
    let products;
    if (category) {
      products = await Land.find({
        partners: { $in: req.user._id },
        facility: {
          $all: typeof category === Array ? [...category] : category,
        },
      })
        .populate(["scheme", "partners"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    } else {
      products = await Land.find({
        partners: { $in: req.user._id },
      })
        .populate(["scheme", "partners"])
        .sort({ price: sortBy == "HTL" ? -1 : 1 })
        .lean()
        .exec();
    }

    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const land = await Land.create(req.body);

    return res.status(200).send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/admin", authenticate, async (req, res) => {
  console.log("Inside land");
  try {
    let land;
    let { title } = req.query;
    console.log(title);
    if (title) {
      land = await Land.find({
        title: new RegExp(title, "i"),
      }).populate(["scheme", "partners"])
        .lean()
        .exec();
      // console.log(Cities, req.query.city);
    } else {
      land = await Land.find().populate(["scheme", "partners"]).lean().exec();
    }

    return res.status(200).send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/admin/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const land = await Land.deleteOne({ _id: id }).lean().exec();

    return res.status(200).send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
