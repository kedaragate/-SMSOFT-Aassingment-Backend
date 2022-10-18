const express = require("express");
const bodyParser = require("body-parser");
const random = require("random");

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});

const users = [
  { name: "kedar", age: "34", id: "1234" },
  { name: "rahul", age: "28", id: "5687" },
];

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  let id = req.params.id;

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
    res.status(200);
    users.push(req.body);
    res.json(users);
  }
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;

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
        res.json(users);
      }
    });
  }
});
