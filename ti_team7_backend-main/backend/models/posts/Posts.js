const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostsSchema);
