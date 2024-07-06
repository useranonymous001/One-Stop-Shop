const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    default: [],
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
