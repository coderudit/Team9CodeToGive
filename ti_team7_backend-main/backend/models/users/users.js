// Author: Anuj Dev (B00900887)

const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: 0 },
    phoneNumber: { type: String, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
