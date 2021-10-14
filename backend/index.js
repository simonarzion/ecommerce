require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`App Listen On Port ${PORT}.`);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", userRouter);
app.use("/posts", postsRouter);
