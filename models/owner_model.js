const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27107/laziStore");

const ownerSchema = mongoose.Schema({
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
  products: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
