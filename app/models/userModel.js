const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  emailId: {
    type: String,
    required: [true, "Email id is required"],
    unique: [true, "Email id already exists"],
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["normal", "admin"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
