const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/generatetoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    // check if the email already exists or not
    let user = await userModel.findOne({ email: email, fullname });
    if (user) {
      req.flash("error", "account already exists, please login");
      return res.redirect("/");
    }

    bcrypt.hash(password, 12, async (err, hash) => {
      let createUser = await userModel.create({
        fullname,
        email,
        password: hash,
      });
      // calls to the utils folder // see utils folder
      let token = generateToken(createUser);
      res.cookie("token", token);
      req.flash("error", "user created successfully");
      return res.redirect("/");
    });
  } catch (error) {
    req.flash("error", "error occured");
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.redirect("/");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = generateToken(user);
      res.cookie("token", token);
      return res.redirect("/shop");
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    req.flash("error", "email or password wrong");
    return res.redirect("/");
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
