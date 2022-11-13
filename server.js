const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { resolve } = require("path");
const dbConfig = resolve(".app/dbconfig/db.config.js");

const bookMarkRoutes = resolve("./app/routes/bookMark.routes.js");

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

bookMarkRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`Server running at ${PORT}`);
});
