require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    // we will try to find the user with the email provided
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if the user is found then it is an error
    if (user)
      return res.status(400).send({ message: "Please try another email" });

    // if user is not found then we will create the user with the email and the password provided
    user = await User.create(req.body);
    // console.log(user);
    return res.status(201).send({ user });
  } catch (err) {
    return res.status(500).send("sign-up failed");
  }
};

const login = async (req, res) => {
  try {
    // we will try to find the user with the email provided
    const user = await User.findOne({ email: req.body.email });

    // If user is not found then return error
    if (!user)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    // if user is found then we will match the passwords
    const match = user.checkPassword(req.body.password);
    // console.log(match);
    if (!match)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    // then we will create the token for that user
    const token = newToken(user);
    // store token in cookie
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 25892000000),
    //   httpOnly: true,
    // });
    // then return the user and the token
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login, newToken };
