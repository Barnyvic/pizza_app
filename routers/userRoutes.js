const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const UserSchema = require("../model/userModel");

userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  const User = UserSchema.register(
    new UserSchema({ username: user.username }),
    user.password,
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local");
        res.send(user);
      }
    }
  );
});

// Loging
userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send({ message: "sigined in successfully" });
});

// Logout
userRouter.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.send("logout successful");
  });
});

module.exports = userRouter;
