// requiring all the modules used
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const port = 5555;
const db = require("./config/mongoose_connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

// setting up view engine
app.set("view-engine", "ejs");

// required packages/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routers
// this will redirect every req to these routes to its scpecific paths

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// server running
app.listen(port, (err) => {
  console.log(err ? err.message : `http://localhost:${port}`);
});
