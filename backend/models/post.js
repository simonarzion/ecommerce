const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  completed: Boolean,
  creator: String,
  createdAt: Date,
});

module.exports = mongoose.model("post", PostSchema);
