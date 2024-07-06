const mongoose = require("mongoose");
const config = require("config");
// only shows message until environment variable is not set up
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/laziStore`)
  .then(() => {
    dbgr("connected the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

// exporting the connection of the whole data base to the app.js
// this will give the whole control to the database
// using this will allow us to not to use mongoose.connect everytime in the models files.
module.exports = mongoose.connection;
