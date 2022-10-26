const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dbConfig = require(path.join(__dirname, "./app/dbconfig/db.config"));

const blogRoutes = require(path.join(__dirname, "./app/routes/blogs.routes"));
const userRoutes = require(path.join(__dirname, "./app/routes/user.routes"));

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});

app.use(bodyParser.json());

mongoose.connect(dbConfig.url);

let db = mongoose.connection;

db.on("error", () => {
  console.log("error in db connection");
});
db.once("open", () => {
  console.log("db connection successful");
});

blogRoutes(app);

userRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
