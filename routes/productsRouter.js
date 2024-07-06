const express = require("express");
const router = express.Router();
const upload = require("../config/multer_config"); // returns upload from multer-config file

const productModel = require("../models/product_model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, discount, price, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "product created successfully");
    return res.redirect("/owners/adminPanel");
  } catch (error) {
    res.send("error");
  }
});

module.exports = router;
