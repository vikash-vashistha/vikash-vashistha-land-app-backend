const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: { type: String }
});

module.exports = mongoose.model("location", locationSchema);
