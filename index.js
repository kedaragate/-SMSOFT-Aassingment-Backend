const express = require("express");
const bodyParser = require("body-parser");
const random = require("random");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
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

const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now() },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const blog = mongoose.model("blog", blogSchema);

app.post("/api/blogs", (req, res) => {
  const { title, author, body } = req.body;
  const id = random.int(1, 100000);
  const comments = [];

  const newBlog = new blog({ title, author, body, id, comments });

  newBlog
    .save()
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/blogs", (req, res) => {
  blog
    .find({})
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/blogs/:id", (req, res) => {
  blog
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/api/blogs/:id", (req, res) => {
  blog
    .findByIdAndUpdate(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        let keysToUpdate = Object.keys(req.body);
        data[keysToUpdate] = req.body[keysToUpdate];
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
