const mongoose = require("mongoose");
const { Schema } = mongoose;
const blog = require(path.join(__dirname, "./blogModel"));
const userSchema = new Schema({
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
  blogs: [{ type: Schema.Types.ObjectId, ref: blog }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
