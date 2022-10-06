const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// hashing the password
UserSchema.pre("save", async function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  const hash = await bcrypt.hash(user.password, 12);
  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});

UserSchema.method.comparePassword = async (password) => {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

module.exports = mongoose.model("USERS", UserSchema);
