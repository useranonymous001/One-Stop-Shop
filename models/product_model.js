const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
  },
  panelcolor: {
    type: String,
    default: [],
  },
  textcolor: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
