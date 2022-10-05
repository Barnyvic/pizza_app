const Passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const dbConfig = require("../config/database");
const User = require("../model/userModel");
