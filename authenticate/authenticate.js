const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserSchema = require("../model/userModel");
const localStrategy = require("passport-local").Strategy;
require("dotenv").config();

//  extract the JWT from the query parameter.
passport.use(
  new JwtStrategy(
    {
      // Extrat JWT from the Header
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (token, next) => {
      try {
        return next(null, token.user);
      } catch (error) {
        next(error);
      }
    }
  )
);

// signUp middleware
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, next) => {
      try {
        const user = await UserSchema.create({ username, password });
        return next(null, user);
      } catch (error) {
        next(error);
      }
    }
  )
);

// login middleware
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, next) => {
      try {
        const user = await UserSchema.findOne({ username });
        if (!user)
          return next(null, false, { message: "User not found Pls Sign Up." });
        const validate = await user.comparePassword(password);
        if (!validate)
          return next(null, false, { message: "Incorrect Password....." });
        return next(null, user, { message: "Logged In Successfully" });
      } catch (error) {
        return next(error);
      }
    }
  )
);
