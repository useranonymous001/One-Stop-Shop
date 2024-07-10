const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/generatetoken");

// module.exports.registerUser = async (req, res) => {
//   try {
//     let { fullname, email, password } = req.body;
//     // check if the email already exists or not
//     let user = await userModel.findOne({ email: email, fullname });
//     if (user) {
//       req.flash("error", "account already exists, please login");
//       return res.redirect("/");
//     }

//     bcrypt.hash(password, 12, async (err, hash) => {
//       let createUser = await userModel.create({
//         fullname,
//         email,
//         password: hash,
//       });
//       // calls to the utils folder // see utils folder
//       let token = generateToken(createUser);
//       res.cookie("token", token);
//       req.flash("error", "user created successfully");
//       return res.redirect("/");
//     });
//   } catch (error) {
//     req.flash("error", "error occured");
//     return res.redirect("/");
//   }
// };

// module.exports.loginUser = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let user = await userModel.findOne({ email });
//     if (!user) {
//       res.redirect("/");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       let token = generateToken(user);
//       res.cookie("token", token);
//       return res.redirect("/shop");
//     } else {
//       return res.redirect("/");
//     }
//   } catch (error) {
//     req.flash("error", "email or password wrong");
//     return res.redirect("/");
//   }
// };

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send("error creating hash");
      }
      // creating user
      try {
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        res.redirect("/login");
      } catch (creationError) {
        console.log(creationError.message);
        res.status(500).send("error creating a user");
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      // return res.status(500).send("user not found");
      req.flash("message", "user not found");
      return res.redirect("/login");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.redirect("/login");
      }
      const token = jwt.sign({ email: user.email }, process.env.JWT_KEY);
      res.cookie("token", token);
      res.redirect("/shop");
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error");
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
