const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: { type: String, unique: true, require: true },
});

module.exports = mongoose.model("location", locationSchema);
