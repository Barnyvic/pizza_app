const express = require("express");
const dbConfig = require("./config/database");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //Used to connect session to Mongodb
const UserSchema = require("./model/userModel");
const userRouter = require("./routers/userRoutes");
const passport = require("passport");
require("dotenv").config();
const PORT = 3334;

const app = express();
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creating a express session || connecting session to mongodb
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessionStore",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// initializing passport
app.use(passport.initialize());
// using Passport session middleware
app.use(passport.session());
// creating a strategy from userschema
passport.use(UserSchema.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  // can use this to know how many people visited a site
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  res.send(`this is the amount of times you viewed ${req.session.viewCount}`);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
