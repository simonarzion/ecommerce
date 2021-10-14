const express = require("express");
const { addNewPost, deletePost, getAllPosts } = require("../controllers/posts");

const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", getAllPosts);
router.post("/create", auth, addNewPost);
router.delete("/delete", auth, deletePost);

module.exports = router;
