const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: false },
    isAdmin: { type: Boolean, default: true },
    isAgent: { type: Boolean, default: false },
    skills: { type: Array, default: false },
    profile: {
      type: String,
      required: true,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
