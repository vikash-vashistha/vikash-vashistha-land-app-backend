const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASS}@cluster0.nwbzgiz.mongodb.net/test`
  );
};
