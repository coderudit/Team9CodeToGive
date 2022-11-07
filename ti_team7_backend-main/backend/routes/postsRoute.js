const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  getPostByEmail,
} = require("../controllers/postsController");
router.post("/addPost", addPost);
router.get("/getAllPosts", getAllPosts);
router.get("/:email", getPostByEmail);
module.exports = router;
