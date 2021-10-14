const express = require("express");
const { addNewPost, deletePost, getAllPosts } = require("../controllers/posts");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", addNewPost);
router.delete("/delete", deletePost);

module.exports = router;
