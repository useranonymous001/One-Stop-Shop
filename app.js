// all the notes about setting up environment variables are in the "Notes" files

// requiring all the modules used
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const port = 5555;
const flash = require("connect-flash");
const expressSession = require("express-session");

// routers
const db = require("./config/mongoose_connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const isLoggedIn = require("./middlewares/isLoggedIn");

// all the variables in the .env files can be used using this
require("dotenv").config();

// setting up view engine
app.set("view engine", "ejs");

// required packages/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

// need to setUp session to work this flash
app.use(flash());
// routers
// this will redirect every req to these routes to its scpecific paths

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// server running
app.listen(port, (err) => {
  if (err) console.log(err.message);
});
