const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/laziStore")
  .then(() => {
    console.log("connected the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

// exporting the connection of the whole data base to the app.js
// this will give the whole control to the database
// using this will allow us to not to use mongoose.connect everytime in the models files.
module.exports = mongoose.connection;
