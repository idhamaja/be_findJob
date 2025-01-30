const mongoose = require("mongoose");

const BookMarkSchema = new mongoose.Schema(
  {
    job: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    company: { type: String, required: true },
    locaton: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookMarkModel", UserSchema);
