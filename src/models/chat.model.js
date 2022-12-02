const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: [{ type: String }],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  chat_with: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: String },
});

module.exports = mongoose.model("chat", chatSchema);
