require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App Listen On Port ${PORT}.`);
});

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to db successfully");
});

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${first_name} ${last_name}`,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(400).json({ message: "User doesn't exists." });

    const passwordMatch = await bcrypt.compare(password, oldUser.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Password incorrect." });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ oldUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});
