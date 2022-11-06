const express = require("express");
const posts = require("../models/posts/Posts");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user ? req.user.id : -1;
    const {
      rows: [post],
    } = await query(`${selectPostStatement} having p.id = $2`, [user_id, id]);
    if (!post) {
      return res
        .status(404)
        .send({ error: "Could not find post with that id" });
    }

    res.send(post);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const addPost = async (req, res) => {
  try {
    const { userEmail, type, title, body } = req.body;
    console.log(userEmail, type, title, body);
    if (!type) {
      throw new Error("Must specify post type.");
    }
    if (!title) {
      throw new Error("Must specify post title.");
    }
    if (!body) {
      throw new Error("Must specify post body.");
    }
    const post = {
      userEmail,
      type,
      title,
      body,
    };
    posts.create(post);
    return res.status(200).json({
      message: "Post created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async (req, res) => {
  const feeds = await posts.find();
  return res.status(200).json({
    posts: feeds,
    success: true,
  });
};

const getPostByEmail = async (email) => {
  let posts = await posts.find({
    email: email,
  });
  return res.status(200).json({
    posts,
    success: true,
  });
};

module.exports = { addPost, getAllPosts, getPostByEmail };
