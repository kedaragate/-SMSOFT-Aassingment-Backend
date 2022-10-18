const express = require("express");
const bodyParser = require("body-parser");
const random = require("random");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://kedaragate:bekedaragate@cluster0.nfq4osw.mongodb.net/?retryWrites=true&w=majority"
);
// 'mongodb://localhost:27017/test'
// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

let db = mongoose.connection;

db.on("error", () => {
  console.log("error in db connection");
});
db.once("open", () => {
  console.log("db connection successful");
});

const app = express();

app.use(bodyParser.json());

const users = [
  { name: "kedar", age: "34", id: 1 },
  { name: "rahul", age: "28", id: 2 },
];

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404);
    res.json({ message: "No such user found" });
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  if (!req.body.name || !req.body.age) {
    res.status(400);
    res.json({ message: "Please enter valid details" });
  } else {
    let user = {
      name: req.body.name,
      age: req.body.age,
      id: random.int(1, 100000),
    };
    res.status(200);

    users.push(user);
    res.json(users);
  }
});

app.put("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404);
    res.json({ message: "No such user found" });
  } else {
    let keys = Object.keys(req.body);

    keys.forEach((key) => {
      if (!user[key]) {
        res.status(400).send({ message: "Invalid details" });
      } else {
        user[key] = req.body[key];
      }
      res.json(users);
    });
  }
});

app.delete("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let newUsers = users.filter((user) => {
    return user.id !== id;
  });
  if (!newUsers) {
    res.status(404);
    res.json({ message: "No such user found" });
  }

  res.json(newUsers);
});
app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
