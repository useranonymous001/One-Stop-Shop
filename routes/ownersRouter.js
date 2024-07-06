const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");

// only work this route when it is in the development environment

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(504)
        .send("you don't have permission to create a new owner.");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
    1;
  });
}
router.get("/adminPanel", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
