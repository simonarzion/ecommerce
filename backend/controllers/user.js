const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

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
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const signIn = async (req, res) => {
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
};

module.exports = { signIn, signUp };
