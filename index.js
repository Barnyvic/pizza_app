const express = require("express");
const dbConfig = require("./config/database");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //Used to connect session to Mongodb
const authRoute = require("./routers/auth");
const bookRoute = require("./routers/Books");
const passport = require("passport");
const UserSchema = require("./model/userModel");
require("./authenticate/authenticate");

require("dotenv").config();
const PORT = 3000;

const app = express();
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/books", passport.authenticate("jwt", { session: false }), bookRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// Creating a express session || connecting session to mongodb
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: "mongodb://localhost:27017/sessionStore",
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//     },
//   })
// );

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
