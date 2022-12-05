const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: [{ type: String, require: true }],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
  chat_with: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  date: { type: String, require: true },
});

module.exports = mongoose.model("chat", chatSchema);
