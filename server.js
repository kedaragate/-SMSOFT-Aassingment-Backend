const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./app/dbconfig/db.config");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbConfig.url);

let db = mongoose.connection;

db.on("error", () => {
  console.log("error in db connection");
});
db.once("open", () => {
  console.log("db connection successful");
});

const blogRoutes = require("./app/routes/blogs.routes");

blogRoutes(app);
const userRoutes = require("./app/routes/user.routes");
userRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
