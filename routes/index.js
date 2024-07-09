const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { route } = require("./ownersRouter");
const router = express.Router();
const productModel = require("../models/product_model");
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const c = require("config");
const upload = require("../config/profile_config");
const crypto = require("crypto");
const fs = require("fs");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

// shop routes
router.get("/shop", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .select("-password");
  let products = await productModel.find();

  let success = req.flash("success");
  res.render("shop", { products, success, user });
});

// add to cart features
router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productId);
  await user.save();
  req.flash("success", "item added to cart");
  res.redirect("/shop");
});

router.get("/cart/delete/:productId", isLoggedIn, async (req, res) => {
  try {
    let { productId } = req.params;

    let user = await userModel
      .findOneAndUpdate(
        { email: req.user.email },
        { $pull: { cart: productId } },
        { new: true }
      )
      .populate("cart");

    if (!user) {
      req.flash("error", "user not found");
      return res.redirect("/cart");
    }

    req.flash("success", "item delelted successfully");
    res.redirect("/cart");
  } catch (error) {
    req.flash("error", "error occured while deleting the item");

    res.redirect("/cart");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart")
    .select("-password");
  let products = user.cart;
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("cart", { products, error, success, user });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .select("-password");

  let error = req.flash("error");
  let success = req.flash("success");
  res.render("user-profile", { user, error, success });
});

router.post("/profile/changePassword", isLoggedIn, async (req, res) => {
  try {
    let { currentPassword, newPassword, confirmPassword } = req.body;
    let user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      req.flash("error", "user not found ");
      return res.redirect("/profile");
    }

    if (!newPassword == confirmPassword) {
      req.flash("error", "new password do not match");
      return res.redirect("/profile");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      req.flash("error", "invalid current passoword");
      res.redirect("/profile");
    }

    const passHash = await bcrypt.hash(newPassword, 12);
    await userModel.findOneAndUpdate(
      { email: req.user.email },
      { password: passHash },
      { new: true }
    );

    req.flash("success", "password updated successfully");
    res.redirect("/profile");
  } catch (error) {
    req.flash("error", "some error occured");
    res.redirect("/profile");
  }
});

// route for changing profile picture of the user.
router.get("/profile/upload", isLoggedIn, (req, res) => {
  fs.access("./public/images/uploads", (err) => {
    console.log(err ? "does not exists" : "exists");
  });
  res.render("upload");
});

router.post(
  "/profile/upload",
  isLoggedIn,
  upload.single("profile"),
  async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile");
  }
);

module.exports = router;
