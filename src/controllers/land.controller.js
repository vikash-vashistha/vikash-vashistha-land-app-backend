const express = require('express');

const Land = require('../models/land.model');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('', authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const land = await Land.create(req.body);
    return res.send(land);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const lands = await Land.find().lean().exec();

    return res.send(lands);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
