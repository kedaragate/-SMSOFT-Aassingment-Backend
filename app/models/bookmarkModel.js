const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
  title: String,
  link: String,

  tags: [{ type: String }],
});

const bookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = bookmarkModel;
