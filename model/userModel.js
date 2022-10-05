const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose"); //importing the passPortLocalMongoose

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// Using the passportLocalMongoose Plugin
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("USERS", UserSchema);
