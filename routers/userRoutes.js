const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const UserSchema = require("../model/userModel");

userRouter.post("/", async (req, res) => {
  const user = req.body;
  const User = UserSchema.register(
    new UserSchema({ username: user.username }),
    user.password,
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local");
      }
    }
  );
});

module.exports = userRouter;
