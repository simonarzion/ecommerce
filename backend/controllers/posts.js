const Post = require("../models/post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Error when getting posts" });
  }
};

const addNewPost = async (req, res) => {
  const { title, body, completed } = req.body;

  const newPost = new Post({
    title,
    body,
    completed,
    creator: req.userId,
    createdAt: new Date(),
  });

  try {
    await newPost.save();

    res.status(201).json({ newPost });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Error when adding a new post" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndRemove(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error when deleting a post" });
  }
};

module.exports = { getAllPosts, addNewPost, deletePost };
