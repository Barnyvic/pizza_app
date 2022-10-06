const express = require("express");
const authRoute = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

authRoute.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "SignUp Successful",
      user: req.user,
    });
  }
);

authRoute.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An error occured");
          return next(error);
        }
        req.logIn(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, username: user.username };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});
module.exports = authRoute;
